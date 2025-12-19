package br.com.TrustReview.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

/**
 * DTO de resposta para informações detalhadas de uma avaliação (Review).
 *
 * <p>
 * Esta classe é usada para transferir dados de avaliações entre o backend e o
 * frontend,
 * representando a resposta da API sem expor diretamente a entidade JPA.
 * Inclui dados do usuário que avaliou, produto avaliado e informações
 * descritivas.
 * </p>
 *
 * <ul>
 * <li><b>userId</b>: Identificador do usuário que fez a avaliação.</li>
 * <li><b>productId</b>: Identificador do produto avaliado.</li>
 * <li><b>title</b>: Título resumido da avaliação.</li>
 * <li><b>description</b>: Texto completo da avaliação.</li>
 * <li><b>pros</b>: Lista de pontos positivos.</li>
 * <li><b>con</b>: Lista de pontos negativos.</li>
 * <li><b>rating</b>: Nota atribuída pelo usuário.</li>
 * <li><b>likes</b>: Número de curtidas recebidas.</li>
 * <li><b>dislikes</b>: Número de reações negativas.</li>
 * <li><b>createdAt</b>: Data/hora de criação da avaliação.</li>
 * <li><b>updatedAt</b>: Data/hora da última atualização.</li>
 * </ul>
 *
 * <p>
 * Utiliza anotações do Swagger para documentação automática e Lombok para
 * geração de métodos utilitários.
 * </p>
 *
 * @author Jean
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de resposta para informações de uma avaliação (Review).")
public class ReviewResponseDTO {

    @Schema(description = "ID do usuário que realizou a avaliação.", example = "3fa85f64-5717-4562-b3fc-2c963f66afa6")
    private UUID userId;

    @Schema(description = "Nome do usuário que realizou a avaliação.", example = "João Silva")
    private String userName;

    @Schema(description = "ID do produto avaliado.", example = "d47f6a19-2b3f-4c9d-8d77-3e9c1b6f50a4")
    private UUID productId;

    @Schema(description = "Título da avaliação.", example = "Excelente custo-benefício!")
    private String title;

    @Schema(description = "Descrição detalhada da avaliação.", example = "O produto superou minhas expectativas...")
    private String description;

    @Schema(description = "Lista de aspectos positivos mencionados pelo usuário.", example = "[\"Qualidade excelente\", \"Design bonito\"]")
    private List<String> pros;

    @Schema(description = "Lista de aspectos negativos mencionados pelo usuário.", example = "[\"Preço elevado\", \"Bateria poderia durar mais\"]")
    private List<String> con;

    @Schema(description = "Nota atribuída ao produto (0.0 a 5.0).", example = "4.5")
    private Double rating;

    @Schema(description = "Quantidade de curtidas recebidas na avaliação.", example = "42")
    private Integer likes;

    @Schema(description = "Quantidade de reações negativas (dislikes) recebidas.", example = "3")
    private Integer dislikes;

    @Schema(description = "Data e hora em que a avaliação foi criada.", example = "2025-10-15T13:45:00.000Z")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    private Timestamp createdAt;

    @Schema(description = "Data e hora da última atualização da avaliação.", example = "2025-10-15T15:12:30.000Z")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    private Timestamp updatedAt;

    @Schema(description = "Indica se a avaliação foi analisada pelo sistema de sentimento.", example = "true")
    private Boolean analyzed;

    @Schema(description = "Indica se a avaliação é contraditória segundo a análise de sentimento.", example = "false")
    private Boolean contradictory;

    @Schema(description = "Pontuação de confiança da análise de sentimento.", example = "0.85")
    private Double confidenceScore;
}
