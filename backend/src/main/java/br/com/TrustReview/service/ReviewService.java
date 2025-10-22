package br.com.TrustReview.service;

import br.com.TrustReview.dto.ReviewRequestDTO;
import br.com.TrustReview.dto.ReviewPutRequestDTO;
import br.com.TrustReview.dto.ReviewResponseDTO;
import br.com.TrustReview.exception.ProductNotFound;
import br.com.TrustReview.exception.ReviewNotFound;
import br.com.TrustReview.exception.UserNotFound;
import br.com.TrustReview.mapper.ReviewMapper;
import br.com.TrustReview.model.*;
import br.com.TrustReview.repository.ReviewRepository;
import br.com.TrustReview.repository.ProductRepository;
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
 * <p>
 * Realiza operações de criação, consulta, atualização e remoção de avaliações,
 * garantindo consistência de dados e validações de existência de {@link User} e {@link Product}.
 * Utiliza mapeadores para conversão entre entidades e DTOs.
 * </p>
 *
 * <ul>
 *   <li><b>create</b>: Cria uma nova avaliação, validando usuário e produto.</li>
 *   <li><b>getById</b>: Busca avaliação pela chave composta (usuário + produto).</li>
 *   <li><b>getAllByProduct</b>: Lista avaliações de um produto específico, com paginação.</li>
 *   <li><b>update</b>: Atualiza conteúdo e nota de uma avaliação existente.</li>
 *   <li><b>delete</b>: Remove uma avaliação específica.</li>
 * </ul>
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

    /**
     * Cria uma nova avaliação (Review).
     *
     * @param request DTO contendo os dados da avaliação
     * @return DTO da avaliação criada
     * @throws UserNotFound se o usuário não existir
     * @throws ProductNotFound se o produto não existir
     */
    @Transactional
    public ReviewResponseDTO create(ReviewRequestDTO request) {
        log.info("Criando nova avaliação para userId={} e productId={}",
                request.getUserId(), request.getProductId());

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFound("Usuário não encontrado para id: " + request.getUserId()));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ProductNotFound("Produto não encontrado para id: " + request.getProductId()));

        // Verifica se o usuário já avaliou o produto
        Optional<Review> existingReview = reviewRepository.findByUserIdAndProductId(user, product);
        if (existingReview.isPresent()) {
            log.error("Usuário {} já possui avaliação para o produto {}", user.getId(), product.getId());
            throw new IllegalArgumentException("Usuário já avaliou este produto.");
        }
        if (request.getRating() ==  null){
            log.error("Rating vazia para o produto {} - {}",product.getName(),product.getId());
            throw new IllegalArgumentException("A avaliação deve conter um valor de rating (não pode ser nulo).");
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
        log.info("Avaliação criada com sucesso. userId={}, productId={}",
                user.getId(), product.getId());
        return reviewMapper.toResponse(saved);
    }

    /**
     * Busca uma avaliação específica (por usuário e produto).
     *
     * @param userId ID do usuário autor da avaliação
     * @param productId ID do produto avaliado
     * @return DTO com os dados da avaliação
     * @throws ReviewNotFound se a avaliação não for encontrada
     */
    @Transactional(readOnly = true)
    public ReviewResponseDTO getById(UUID userId, UUID productId) {
        log.info("Buscando avaliação para userId={} e productId={}", userId, productId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound("Usuário não encontrado para id: " + userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFound("Produto não encontrado para id: " + productId));

        Review review = reviewRepository.findByUserIdAndProductId(user, product)
                .orElseThrow(() -> new ReviewNotFound("Avaliação não encontrada para este usuário e produto."));

        return reviewMapper.toResponse(review);
    }

    /**
     * Retorna todas as avaliações de um produto específico, com suporte a paginação.
     *
     * @param productId ID do produto avaliado
     * @param page número da página (0-index)
     * @param size tamanho da página
     * @return Página contendo avaliações do produto
     * @throws ProductNotFound se o produto não for encontrado
     */
    @Transactional(readOnly = true)
    public Page<ReviewResponseDTO> getAllByProduct(UUID productId, int page, int size) {
        log.info("Listando avaliações para produto: {}", productId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFound("Produto não encontrado para id: " + productId));

        var pageable = PageRequest.of(page, size);
        Page<Review> reviews = reviewRepository.findByProductId(product, pageable);

        if (reviews.isEmpty()) {
            log.warn("Nenhuma avaliação encontrada para produto {}", productId);
            throw new ReviewNotFound("Nenhuma avaliação encontrada para o produto.");
        }

        return reviews.map(reviewMapper::toResponse);
    }

    /**
     * Atualiza uma avaliação existente (título, descrição, prós, contras e nota).
     *
     * @param userId ID do usuário autor da avaliação
     * @param productId ID do produto avaliado
     * @param request DTO com novos dados
     * @return DTO da avaliação atualizada
     * @throws ReviewNotFound se a avaliação não existir
     */
    @Transactional
    public ReviewResponseDTO update(UUID userId, UUID productId, ReviewPutRequestDTO request) {
        log.info("Atualizando avaliação userId={} productId={}", userId, productId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound("Usuário não encontrado para id: " + userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFound("Produto não encontrado para id: " + productId));

        Review existing = reviewRepository.findByUserIdAndProductId(user, product)
                .orElseThrow(() -> new ReviewNotFound("Avaliação não encontrada para atualização."));

        // Atualiza apenas campos informados
        if (request.getTitle() != null) existing.setTitle(request.getTitle());
        if (request.getDescription() != null) existing.setDescription(request.getDescription());
        if (request.getLikes() != null) existing.setLikes(request.getLikes());
        if (request.getDislikes() != null) existing.setDislikes(request.getDislikes());

        // TODO: melhorar logica de pros e con para se quiser adicionar apenas um novo con/pro e nao refazer esses dois campos.
        if (request.getPros() != null) existing.setPros(request.getPros());
        if (request.getCon() != null) existing.setCon(request.getCon());

        if (request.getRating() != null) existing.setRating(request.getRating());

        existing.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        log.info("Likes antes de salvar: {}, novos likes recebidos: {}", existing.getLikes(), request.getLikes());

        Review updated = reviewRepository.save(existing);
        log.info("Avaliação atualizada com sucesso para userId={} productId={}", userId, productId);

        return reviewMapper.toResponse(updated);
    }

    /**
     * Remove uma avaliação (Review) com base no usuário e produto.
     *
     * @param userId ID do usuário autor
     * @param productId ID do produto avaliado
     * @throws ReviewNotFound se a avaliação não existir
     */
    @Transactional
    public void delete(UUID userId, UUID productId) {
        log.info("Deletando avaliação userId={} productId={}", userId, productId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound("Usuário não encontrado para id: " + userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFound("Produto não encontrado para id: " + productId));

        Review review = reviewRepository.findByUserIdAndProductId(user, product)
                .orElseThrow(() -> new ReviewNotFound("Avaliação não encontrada para exclusão."));

        reviewRepository.delete(review);
        log.info("Avaliação removida com sucesso para userId={} productId={}", userId, productId);
    }

    /**
     * Busca todas as avaliações com nota acima de um valor mínimo.
     *
     * @param minRating Nota mínima
     * @return Lista de avaliações com nota superior ou igual
     */
    @Transactional(readOnly = true)
    public List<ReviewResponseDTO> getHighRated(Double minRating) {
        log.info("Buscando avaliações com nota >= {}", minRating);
        List<Review> reviews = reviewRepository.findByRatingGreaterThanEqual(minRating);

        if (reviews.isEmpty()) {
            throw new ReviewNotFound("Nenhuma avaliação encontrada com nota mínima: " + minRating);
        }

        return reviews.stream()
                .map(reviewMapper::toResponse)
                .toList();
    }
}
