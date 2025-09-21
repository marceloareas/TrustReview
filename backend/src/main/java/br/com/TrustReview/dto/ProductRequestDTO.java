package br.com.TrustReview.dto;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO de requisição para criação ou atualização de produto.
 *
 * <p>
 * Esta classe é utilizada para transferir dados de produtos do front-end para o back-end,
 * encapsulando os detalhes necessários para a criação ou atualização de um produto na aplicação.
 * </p>
 *
 * <ul>
 *   <li><b>name</b>: Nome do produto (obrigatório, entre 2 e 255 caracteres).</li>
 * </ul>
 *
 * <p>
 * Utiliza anotações do Swagger para documentação automática, do Lombok para reduzir boilerplate
 * e do Jakarta Validation para validação dos campos.
 * </p>
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de requisição para criação ou atualização de produto")
public class ProductRequestDTO {

    @NotBlank(message = "O nome do produto é obrigatório")
    @Size(min = 2, max = 255, message = "O nome do produto deve ter entre 2 e 255 caracteres")
    @Schema(description = "Nome do produto", example = "Notebook Dell XPS 13", required = true)
    private String name;

    @Size(max = 1000, message = "A descrição do produto deve ter no máximo 1000 caracteres")
    @Schema(description = "Descrição do produto", example = "Um notebook potente e leve da Dell")
    private String description;

    // @NotBlank(message = "As tags do produto são obrigatórias")
    @Size(min = 1, message = "O produto deve ter pelo menos uma tag")
    @Schema(description = "Lista de tags associadas ao produto")
    private Set<TagResponseDTO> tags;

    @Schema(description = "Avaliação geral do produto", example = "4.5")
    private Double overallRating;

    @Schema(description = "Timestamp de criação do produto", example = "2023-10-01T12:00:00Z")
    private Timestamp createdAt;

    @Schema(description = "Timestamp da última atualização do produto", example = "2023-10-10T15:30:00Z")
    private Timestamp updatedAt;
}
