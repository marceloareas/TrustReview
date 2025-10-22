package br.com.TrustReview.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

/**
 * DTO de requisição para criação ou atualização de uma avaliação (Review).
 *
 * <p>
 * Esta classe é utilizada para transferir dados de avaliações do front-end para o back-end,
 * encapsulando as informações necessárias para criação ou edição de uma avaliação
 * de produto por um usuário.
 * </p>
 *
 * <ul>
 *   <li><b>userId</b>: Identificador do usuário que faz a avaliação (obrigatório).</li>
 *   <li><b>productId</b>: Identificador do produto avaliado (obrigatório).</li>
 *   <li><b>title</b>: Título resumido da avaliação (obrigatório, 2–50 caracteres).</li>
 *   <li><b>description</b>: Texto detalhado da avaliação (obrigatório, até 1444 caracteres).</li>
 *   <li><b>pros</b>: Lista de aspectos positivos (mínimo 1 item).</li>
 *   <li><b>con</b>: Lista de aspectos negativos (opcional).</li>
 *   <li><b>rating</b>: Nota atribuída ao produto (obrigatória, 0.0–5.0).</li>
 *   <li><b>createdAt</b>: Data/hora de criação (opcional, preenchida pelo backend).</li>
 *   <li><b>updatedAt</b>: Data/hora da última atualização (opcional, preenchida pelo backend).</li>
 * </ul>
 *
 * <p>
 * Utiliza anotações do Swagger para documentação automática, do Lombok para geração
 * de métodos utilitários e do Jakarta Validation para validação dos campos.
 * </p>
 *
 * @author Jean
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de requisição para criação ou atualização de uma avaliação (Review).")
public class ReviewRequestDTO {

    @NotNull(message = "O ID do usuário é obrigatório")
    @Schema(description = "ID do usuário que realiza a avaliação", example = "b07f1c98-21a3-4a54-b7f5-62c84e3b23ef", required = true)
    private UUID userId;

    @NotNull(message = "O ID do produto é obrigatório")
    @Schema(description = "ID do produto avaliado", example = "9c4b3a8d-113d-412d-9f2a-7a6a4ed27a21", required = true)
    private UUID productId;

    @NotBlank(message = "O título da avaliação é obrigatório")
    @Size(min = 2, max = 50, message = "O título da avaliação deve ter entre 2 e 50 caracteres")
    @Schema(description = "Título da avaliação", example = "Excelente custo-benefício!", required = true)
    private String title;

    @NotBlank(message = "A descrição da avaliação é obrigatória")
    @Size(max = 1444, message = "A descrição deve ter no máximo 1444 caracteres")
    @Schema(description = "Descrição detalhada da avaliação", example = "O produto superou minhas expectativas em desempenho e acabamento.")
    private String description;

    @Min(0)
    @Schema(description = "Quantidade de curtidas recebidas na avaliação.", example = "42")
    private Integer likes;

    @Min(0)
    @Schema(description = "Quantidade de reações negativas (dislikes) recebidas.", example = "3")
    private Integer dislikes;


    @NotEmpty(message = "A lista de aspectos positivos (pros) não pode estar vazia")
    @Schema(description = "Aspectos positivos da experiência com o produto", example = "[\"Qualidade excelente\", \"Design bonito\"]")
    private List<String> pros;

    @NotEmpty(message = "A lista de aspectos negativos (con) não pode estar vazia")
    @Schema(description = "Aspectos negativos da experiência com o produto", example = "[\"Preço elevado\", \"Bateria poderia durar mais\"]")
    private List<String> con;

    @NotNull(message = "A nota atribuída é obrigatória")
    @DecimalMin(value = "0.0", message = "A nota mínima permitida é 0.0")
    @DecimalMax(value = "5.0", message = "A nota máxima permitida é 5.0")
    @Schema(description = "Nota atribuída ao produto (0.0 a 5.0)", example = "4.5", required = true)
    private Double rating;

    @Schema(description = "Timestamp de criação da avaliação", example = "2025-10-15T13:45:00.000Z")
    private Timestamp createdAt;

    @Schema(description = "Timestamp da última atualização da avaliação", example = "2025-10-15T15:12:30.000Z")
    private Timestamp updatedAt;
}