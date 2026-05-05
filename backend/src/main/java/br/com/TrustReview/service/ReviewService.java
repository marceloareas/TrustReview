package br.com.TrustReview.service;

import br.com.TrustReview.dto.ReviewPutRequestDTO;
import br.com.TrustReview.dto.ReviewRequestDTO;
import br.com.TrustReview.dto.ReviewResponseDTO;
import br.com.TrustReview.exception.ProductNotFound;
import br.com.TrustReview.exception.ReviewNotFound;
import br.com.TrustReview.exception.UserNotFound;
import br.com.TrustReview.mapper.ReviewMapper;
import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.Review;
import br.com.TrustReview.model.User;
import br.com.TrustReview.repository.ProductRepository;
import br.com.TrustReview.repository.ReviewRepository;
import br.com.TrustReview.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Serviço responsável pela lógica de negócio da entidade {@link Review}.
 *
 * @author Jean
 */
@Slf4j
@Service
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ReviewSentimentAsyncService reviewSentimentAsyncService;
    private final ResumoService resumoService;
    private final ProductSummaryAsyncService productSummaryAsyncService;

    /**
     * Cria uma nova avaliação (Review).
     */
    @Transactional
    public ReviewResponseDTO create(ReviewRequestDTO request) {

        log.info(
            "Criando nova avaliação para userId={} e productId={}",
            request.getUserId(),
            request.getProductId()
        );

        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() ->
                new UserNotFound("Usuário não encontrado para id: " + request.getUserId())
            );

        Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() ->
                new ProductNotFound("Produto não encontrado para id: " + request.getProductId())
            );

        Optional<Review> existingReview =
            reviewRepository.findByUserIdAndProductId(user, product);

        if (existingReview.isPresent()) {
            throw new IllegalArgumentException("Usuário já avaliou este produto.");
        }

        if (request.getRating() == null) {
            throw new IllegalArgumentException("A avaliação deve conter um rating.");
        }

        Review review = reviewMapper.toReview(request);
        review.setUserId(user);
        review.setProductId(product);
        review.setRating(request.getRating());
        review.setLikes(0);
        review.setDislikes(0);
        review.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        review.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        Review saved = reviewRepository.save(review);

        log.info(
            "Avaliação criada com sucesso. userId={}, productId={}",
            user.getId(),
            product.getId()
        );

        // 🔥 DISPARO DA ANÁLISE DE SENTIMENTO (ASSÍNCRONO)
        reviewSentimentAsyncService.analyzeReviewAsync(saved);

        // Atualiza nota geral do produto
        recalculateProductOverallRating(product);

        productSummaryAsyncService.updateProductSummaryAsync(product);

        return reviewMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public ReviewResponseDTO getById(UUID userId, UUID productId) {

        User user = userRepository.findById(userId)
            .orElseThrow(() ->
                new UserNotFound("Usuário não encontrado para id: " + userId)
            );

        Product product = productRepository.findById(productId)
            .orElseThrow(() ->
                new ProductNotFound("Produto não encontrado para id: " + productId)
            );

        Review review = reviewRepository
            .findByUserIdAndProductId(user, product)
            .orElseThrow(() ->
                new ReviewNotFound("Avaliação não encontrada.")
            );

        return reviewMapper.toResponse(review);
    }

    @Transactional(readOnly = true)
    public Page<ReviewResponseDTO> getAllByProduct(UUID productId, int page, int size) {

        Product product = productRepository.findById(productId)
            .orElseThrow(() ->
                new ProductNotFound("Produto não encontrado para id: " + productId)
            );

        Page<Review> reviews =
            reviewRepository.findByProductId(product, PageRequest.of(page, size));

        if (reviews.isEmpty()) {
            throw new ReviewNotFound("Nenhuma avaliação encontrada.");
        }

        return reviews.map(reviewMapper::toResponse);
    }

    @Transactional
    public ReviewResponseDTO update(
        UUID userId,
        UUID productId,
        ReviewPutRequestDTO request
    ) {

        User user = userRepository.findById(userId)
            .orElseThrow(() ->
                new UserNotFound("Usuário não encontrado.")
            );

        Product product = productRepository.findById(productId)
            .orElseThrow(() ->
                new ProductNotFound("Produto não encontrado.")
            );

        Review existing = reviewRepository
            .findByUserIdAndProductId(user, product)
            .orElseThrow(() ->
                new ReviewNotFound("Avaliação não encontrada.")
            );

        if (request.getTitle() != null) existing.setTitle(request.getTitle());
        if (request.getDescription() != null) existing.setDescription(request.getDescription());
        if (request.getPros() != null) existing.setPros(request.getPros());
        if (request.getCon() != null) existing.setCon(request.getCon());
        if (request.getLikes() != null) existing.setLikes(request.getLikes());
        if (request.getDislikes() != null) existing.setDislikes(request.getDislikes());
        if (request.getRating() != null) existing.setRating(request.getRating());

        existing.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        Review updated = reviewRepository.save(existing);

        if (request.getRating() != null) {
            recalculateProductOverallRating(product);
        }

        productSummaryAsyncService.updateProductSummaryAsync(product);

        return reviewMapper.toResponse(updated);
    }

    @Transactional
    public void delete(UUID userId, UUID productId) {

        User user = userRepository.findById(userId)
            .orElseThrow(() ->
                new UserNotFound("Usuário não encontrado.")
            );

        Product product = productRepository.findById(productId)
            .orElseThrow(() ->
                new ProductNotFound("Produto não encontrado.")
            );

        Review review = reviewRepository
            .findByUserIdAndProductId(user, product)
            .orElseThrow(() ->
                new ReviewNotFound("Avaliação não encontrada.")
            );

        reviewRepository.delete(review);

        recalculateProductOverallRating(product);
        productSummaryAsyncService.updateProductSummaryAsync(product);
    }

    private void recalculateProductOverallRating(Product product) {

        List<Review> reviews = reviewRepository.findByProductId(product);

        double avg =
            reviews.stream()
                .filter(r -> r.getRating() != null)
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0.0);

        product.setOverallRating(avg);
        product.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        productRepository.save(product);

        log.info(
            "Nota geral do produto {} recalculada para {}",
            product.getId(),
            avg
        );
    }

        @Transactional(readOnly = true)
        public List<ReviewResponseDTO> getHighRated(Double minRating) {

        log.info("Buscando avaliações com nota >= {}", minRating);

        List<Review> reviews =
                reviewRepository.findByRatingGreaterThanEqual(minRating);

        if (reviews.isEmpty()) {
                throw new ReviewNotFound(
                "Nenhuma avaliação encontrada com nota mínima: " + minRating
                );
        }

        return reviews.stream()
                .map(reviewMapper::toResponse)
                .toList();
        }
}
