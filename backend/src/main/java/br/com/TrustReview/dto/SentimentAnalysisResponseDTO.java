package br.com.TrustReview.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO de resposta para análise de sentimento de uma avaliação.
 *
 * <p>
 * Esta classe representa os dados retornados pelo serviço de análise de sentimento
 * após o processamento de uma avaliação enviada pelo cliente.
 * Fornece informações quantitativas sobre o sentimento identificado,
 * possíveis contradições e o nível de confiança da análise.
 * </p>
 *
 * <ul>
 *   <li><b>sentimentScore</b>: Pontuação do sentimento extraída do texto da avaliação.</li>
 *   <li><b>ratingScore</b>: Pontuação derivada da nota atribuída pelo usuário.</li>
 *   <li><b>contradiction</b>: Indica se há contradição entre o texto e a nota.</li>
 *   <li><b>confidence</b>: Nível de confiança da análise de sentimento.</li>
 * </ul>
 *
 * <p>
 * Utiliza Lombok para geração automática de getters, setters e construtores,
 * e Swagger (OpenAPI) para documentação automática da API.
 * </p>
 *
 * @author Jean
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de resposta contendo o resultado da análise de sentimento de uma avaliação.")
public class SentimentAnalysisResponseDTO {

    @Schema(
        description = "Pontuação do sentimento extraída do texto da avaliação. Valores mais altos indicam sentimento mais positivo.",
        example = "0.72"
    )
    private double sentimentScore;

    @Schema(
        description = "Pontuação correspondente à nota atribuída pelo usuário.",
        example = "4.0"
    )
    private double ratingScore;

    @Schema(
        description = "Indica se existe contradição entre o sentimento identificado no texto e a nota atribuída.",
        example = "false"
    )
    private boolean contradiction;

    @Schema(
        description = "Nível de confiança da análise de sentimento, variando de 0.0 a 1.0.",
        example = "0.88"
    )
    private double confidence;
}
