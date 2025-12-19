package br.com.TrustReview.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

/**
 * DTO de requisição para envio de dados destinados à análise de sentimento.
 *
 * <p>
 * Esta classe é utilizada para encapsular as informações necessárias
 * para realizar a análise de sentimento de uma avaliação de produto,
 * normalmente consumida por um serviço interno ou externo de processamento
 * de linguagem natural (NLP).
 * </p>
 *
 * <p>
 * Os dados contidos neste DTO permitem correlacionar o resultado da análise
 * com o usuário e o produto avaliados, além de fornecer o texto e a nota
 * atribuída que servirão de base para a análise.
 * </p>
 *
 * <ul>
 *   <li><b>userId</b>: Identificador do usuário que realizou a avaliação.</li>
 *   <li><b>productId</b>: Identificador do produto avaliado.</li>
 *   <li><b>description</b>: Texto da avaliação que será analisado.</li>
 *   <li><b>rating</b>: Nota atribuída ao produto pelo usuário.</li>
 * </ul>
 *
 * <p>
 * Utiliza anotações do Swagger para documentação automática da API.
 * </p>
 *
 * @author Jean
 */
@Schema(description = "DTO de requisição para análise de sentimento de uma avaliação.")
public class SentimentAnalysisRequestDTO {

    @Schema(
            description = "Identificador único do usuário que realizou a avaliação",
            example = "550e8400-e29b-41d4-a716-446655440000",
            required = true
    )
    private UUID userId;

    @Schema(
            description = "Identificador único do produto avaliado",
            example = "123e4567-e89b-12d3-a456-426614174000",
            required = true
    )
    private UUID productId;

    @Schema(
            description = "Descrição textual da avaliação que será submetida à análise de sentimento",
            example = "O produto tem ótima qualidade, mas a entrega demorou mais do que o esperado.",
            required = true
    )
    private String description;

    @Schema(
            description = "Nota atribuída ao produto pelo usuário",
            example = "4.0",
            required = true
    )
    private Double rating;

    /**
     * Construtor completo para criação do DTO de requisição de análise de sentimento.
     *
     * @param userId      identificador do usuário
     * @param productId   identificador do produto
     * @param description texto da avaliação
     * @param rating      nota atribuída ao produto
     */
    public SentimentAnalysisRequestDTO(
            UUID userId,
            UUID productId,
            String description,
            Double rating
    ) {
        this.userId = userId;
        this.productId = productId;
        this.description = description;
        this.rating = rating;
    }

    /**
     * @return identificador do usuário que realizou a avaliação
     */
    public UUID getUserId() {
        return userId;
    }

    /**
     * @return identificador do produto avaliado
     */
    public UUID getProductId() {
        return productId;
    }

    /**
     * @return descrição textual da avaliação
     */
    public String getDescription() {
        return description;
    }

    /**
     * @return nota atribuída ao produto
     */
    public Double getRating() {
        return rating;
    }
}
