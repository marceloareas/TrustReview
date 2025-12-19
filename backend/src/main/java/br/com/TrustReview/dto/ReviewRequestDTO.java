package br.com.TrustReview.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

/**
 * DTO de requisição para criação de uma avaliação (Review).
 *
 * <p>
 * Esta classe é utilizada para transferir os dados enviados pelo cliente
 * no momento da criação de uma nova avaliação de produto.
 * Contém todas as informações necessárias para registrar a experiência
 * do usuário, incluindo texto descritivo, pontos positivos, negativos
 * e a nota atribuída.
 * </p>
 *
 * <ul>
 *   <li><b>userId</b>: Identificador do usuário que realizou a avaliação (obrigatório).</li>
 *   <li><b>productId</b>: Identificador do produto avaliado (obrigatório).</li>
 *   <li><b>title</b>: Título resumido da avaliação (obrigatório, 2 a 50 caracteres).</li>
 *   <li><b>description</b>: Descrição detalhada da avaliação (obrigatória, até 1444 caracteres).</li>
 *   <li><b>pros</b>: Lista de aspectos positivos da experiência (mínimo 1 item).</li>
 *   <li><b>con</b>: Lista de aspectos negativos da experiência (mínimo 1 item).</li>
 *   <li><b>rating</b>: Nota atribuída ao produto (obrigatória, de 1.0 a 5.0).</li>
 * </ul>
 *
 * <p>
 * Utiliza anotações do Jakarta Validation para validação dos campos,
 * Lombok para geração de métodos utilitários e Swagger (OpenAPI)
 * para documentação automática da API.
 * </p>
 *
 * @author Jean
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de requisição POST para criação de uma avaliação (Review).")
public class ReviewRequestDTO {

    @NotNull(message = "O ID do usuário é obrigatório")
    @Schema(
            description = "Identificador único do usuário que está criando a avaliação",
            example = "550e8400-e29b-41d4-a716-446655440000",
            required = true
    )
    private UUID userId;

    @NotNull(message = "O ID do produto é obrigatório")
    @Schema(
            description = "Identificador único do produto que está sendo avaliado",
            example = "123e4567-e89b-12d3-a456-426614174000",
            required = true
    )
    private UUID productId;

    @NotBlank(message = "O título da avaliação é obrigatório")
    @Size(min = 2, max = 50, message = "O título deve ter entre 2 e 50 caracteres")
    @Schema(
            description = "Título resumido da avaliação",
            example = "Ótimo produto, recomendo!",
            required = true
    )
    private String title;

    @NotBlank(message = "A descrição da avaliação é obrigatória")
    @Size(max = 1444, message = "A descrição deve ter no máximo 1444 caracteres")
    @Schema(
            description = "Descrição detalhada da experiência do usuário com o produto",
            example = "O produto atendeu muito bem às expectativas, com excelente acabamento e desempenho.",
            required = true
    )
    private String description;

    @NotEmpty(message = "A lista de pontos positivos não pode estar vazia")
    @Schema(
            description = "Lista de aspectos positivos da experiência com o produto",
            example = "[\"Boa qualidade\", \"Entrega rápida\"]",
            required = true
    )
    private List<String> pros;

    @NotEmpty(message = "A lista de pontos negativos não pode estar vazia")
    @Schema(
            description = "Lista de aspectos negativos da experiência com o produto",
            example = "[\"Preço elevado\", \"Manual pouco claro\"]",
            required = true
    )
    private List<String> con;

    @NotNull(message = "A nota da avaliação é obrigatória")
    @DecimalMin(value = "1.0", message = "A nota mínima permitida é 1.0")
    @DecimalMax(value = "5.0", message = "A nota máxima permitida é 5.0")
    @Schema(
            description = "Nota atribuída ao produto, variando de 1.0 a 5.0",
            example = "4.5",
            required = true
    )
    private Double rating;
}