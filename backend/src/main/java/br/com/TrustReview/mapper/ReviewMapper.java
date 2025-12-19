package br.com.TrustReview.mapper;

import br.com.TrustReview.dto.ReviewRequestDTO;
import br.com.TrustReview.dto.ReviewResponseDTO;
import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.Review;
import br.com.TrustReview.model.User;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.UUID;

/**
 * Mapper responsável por converter objetos entre a entidade {@link Review} e seus DTOs.
 *
 * <p>
 * Esta classe encapsula a lógica de transformação de dados, garantindo que
 * as informações sejam corretamente mapeadas do DTO de requisição para a
 * entidade e da entidade para o DTO de resposta.
 * </p>
 *
 * <ul>
 *   <li>{@link #toReview(ReviewRequestDTO)}: Converte {@link ReviewRequestDTO} em {@link Review}.</li>
 *   <li>{@link #toResponse(Review)}: Converte {@link Review} em {@link ReviewResponseDTO}.</li>
 * </ul>
 *
 * <p>
 * Garante que campos controlados pelo backend (como likes, dislikes,
 * análise de sentimento e timestamps) sejam inicializados corretamente.
 * </p>
 * 
 * <p>
 * Também trata a conversão segura de IDs e nomes de usuário e produto,
 * evitando NullPointerException quando as referências estiverem ausentes.
 * </p>
 * 
 * @author Jean
 */
@Component
public class ReviewMapper {

    /**
     * Converte um {@link ReviewRequestDTO} em uma entidade {@link Review}.
     *
     * <p>
     * Inicializa os campos de estado padrão (likes, dislikes, analisado, contraditório, score)
     * e timestamps de criação e atualização com o horário atual.
     * </p>
     *
     * @param request DTO de requisição contendo os dados da avaliação
     * @return entidade {@link Review} pronta para persistência
     */
    public Review toReview(ReviewRequestDTO request) {

        Review review = new Review();

        User user = new User();
        user.setId(request.getUserId());
        review.setUserId(user);

        Product product = new Product();
        product.setId(request.getProductId());
        review.setProductId(product);

        review.setTitle(request.getTitle());
        review.setDescription(request.getDescription());
        review.setPros(request.getPros());
        review.setCon(request.getCon());
        review.setRating(request.getRating());

        // Estado inicial controlado pelo backend
        review.setLikes(0);
        review.setDislikes(0);
        review.setAnalyzed(false);
        review.setContradictory(false);
        review.setConfidenceScore(0.0);

        Timestamp now = new Timestamp(System.currentTimeMillis());
        review.setCreatedAt(now);
        review.setUpdatedAt(now);

        return review;
    }

    /**
     * Converte uma entidade {@link Review} em {@link ReviewResponseDTO}.
     *
     * <p>
     * Mapeia todos os campos relevantes da entidade para o DTO de resposta,
     * incluindo informações do usuário, produto, métricas de curtidas/descurtidas,
     * timestamps e resultados de análise de sentimento.
     * </p>
     *
     * @param review entidade {@link Review} a ser convertida
     * @return {@link ReviewResponseDTO} contendo os dados prontos para envio ao cliente
     */
    public ReviewResponseDTO toResponse(Review review) {

        ReviewResponseDTO response = new ReviewResponseDTO();

        UUID userId = review.getUserId() != null ? review.getUserId().getId() : null;
        UUID productId = review.getProductId() != null ? review.getProductId().getId() : null;
        String userName = review.getUserId() != null ? review.getUserId().getName() : null;

        response.setUserId(userId);
        response.setUserName(userName);
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
        response.setAnalyzed(review.isAnalyzed());
        response.setContradictory(review.isContradictory());
        response.setConfidenceScore(review.getConfidenceScore());

        return response;
    }
}
