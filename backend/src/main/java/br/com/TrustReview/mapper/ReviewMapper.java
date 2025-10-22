package br.com.TrustReview.mapper;

import br.com.TrustReview.dto.ReviewRequestDTO;
import br.com.TrustReview.dto.ReviewResponseDTO;
import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.Review;
import br.com.TrustReview.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Classe responsável por mapear objetos entre as entidades {@link Review}
 * e seus respectivos DTOs de requisição e resposta.
 *
 * <p>
 * Centraliza a lógica de transformação entre entidades do domínio e objetos de transferência de dados (DTOs),
 * facilitando a conversão de dados entre as camadas da aplicação.
 * </p>
 *
 * <ul>
 *   <li><b>toReview(ReviewRequestDTO)</b>: Converte um {@link ReviewRequestDTO} em uma entidade {@link Review}.</li>
 *   <li><b>toReview(ReviewResponseDTO)</b>: Converte um {@link ReviewResponseDTO} em uma entidade {@link Review}.</li>
 *   <li><b>toResponse(Review)</b>: Converte uma entidade {@link Review} em um {@link ReviewResponseDTO}.</li>
 *   <li><b>toResponse(ReviewRequestDTO)</b>: Converte um {@link ReviewRequestDTO} em um {@link ReviewResponseDTO}.</li>
 * </ul>
 *
 * <p>
 * Esta classe não realiza persistência ou validações de negócio — apenas a transformação de dados.
 * </p>
 *
 * @author Jean
 */
@Slf4j
@Component
@Schema(description = "Classe de mapeamento entre entidades e DTOs de Avaliação (Review)")
public class ReviewMapper {

    /**
     * Converte um ReviewRequestDTO em uma entidade Review.
     *
     * @param request DTO de requisição contendo os dados da avaliação.
     * @return Entidade Review preenchida.
     */
    public Review toReview(ReviewRequestDTO request) {
        Review review = new Review();

        if (request.getUserId() != null) {
            User user = new User();
            user.setId(request.getUserId());
            review.setUserId(user);
        }

        if (request.getProductId() != null) {
            Product product = new Product();
            product.setId(request.getProductId());
            review.setProductId(product);
        }

        review.setTitle(request.getTitle());
        review.setDescription(request.getDescription());
        review.setPros(request.getPros());
        review.setCon(request.getCon());
        review.setRating(request.getRating());
        review.setLikes(request.getLikes());
        review.setDislikes(request.getDislikes());
        review.setCreatedAt(request.getCreatedAt());
        review.setUpdatedAt(request.getUpdatedAt());

        return review;
    }

    /**
     * Converte um ReviewResponseDTO em uma entidade Review.
     *
     * @param response DTO de resposta contendo os dados da avaliação.
     * @return Entidade Review preenchida.
     */
    public Review toReview(ReviewResponseDTO response) {
        Review review = new Review();

        if (response.getUserId() != null) {
            User user = new User();
            user.setId(response.getUserId());
            review.setUserId(user);
        }

        if (response.getProductId() != null) {
            Product product = new Product();
            product.setId(response.getProductId());
            review.setProductId(product);
        }

        review.setTitle(response.getTitle());
        review.setDescription(response.getDescription());
        review.setPros(response.getPros());
        review.setCon(response.getCon());
        review.setRating(response.getRating());
        review.setLikes(response.getLikes());
        review.setDislikes(response.getDislikes());
        review.setCreatedAt(response.getCreatedAt());
        review.setUpdatedAt(response.getUpdatedAt());

        return review;
    }

    /**
     * Converte uma entidade Review em um ReviewResponseDTO.
     *
     * @param review Entidade Review.
     * @return DTO de resposta da avaliação.
     */
    public ReviewResponseDTO toResponse(Review review) {
        ReviewResponseDTO response = new ReviewResponseDTO();

        UUID userId = (review.getUserId() != null) ? review.getUserId().getId() : null;
        UUID productId = (review.getProductId() != null) ? review.getProductId().getId() : null;
        response.setUserId(userId);
        response.setProductId(productId);
        response.setTitle(review.getTitle());
        response.setDescription(review.getDescription());
        response.setPros(review.getPros());
        response.setCon(review.getCon());
        response.setRating(review.getRating());
        response.setLikes(review.getLikes());
        response.setDislikes(review.getDislikes());
        response.setCreatedAt(review.getCreatedAt());
        response.setUpdatedAt(review.getUpdatedAt());

        return response;
    }

    /**
     * Converte um ReviewRequestDTO em um ReviewResponseDTO.
     *
     * <p>
     * Útil para retornar a mesma avaliação criada sem precisar buscar novamente do banco.
     * </p>
     *
     * @param request DTO de requisição da avaliação.
     * @return DTO de resposta da avaliação.
     */
    public ReviewResponseDTO toResponse(ReviewRequestDTO request) {
        ReviewResponseDTO response = new ReviewResponseDTO();

        response.setUserId(request.getUserId());
        response.setProductId(request.getProductId());
        response.setTitle(request.getTitle());
        response.setDescription(request.getDescription());
        response.setPros(request.getPros());
        response.setCon(request.getCon());
        response.setRating(request.getRating());
        response.setLikes(request.getLikes());
        response.setDislikes(request.getDislikes());
        response.setCreatedAt(request.getCreatedAt());
        response.setUpdatedAt(request.getUpdatedAt());

        return response;
    }
}
