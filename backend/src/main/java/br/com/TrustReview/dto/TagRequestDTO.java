package br.com.TrustReview.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO de requisição para criação ou atualização de uma tag.
 *
 * <p>
 * Esta classe é utilizada para receber dados enviados pelo cliente ao criar ou atualizar uma tag,
 * incluindo nome (obrigatório) e descrição.
 * </p>
 *
 * <ul>
 *   <li><b>name</b>: Nome da tag (obrigatório).</li>
 *   <li><b>description</b>: Descrição da tag.</li>
 * </ul>
 *
 * <p>
 * Utiliza validação Bean Validation e anotações do Swagger para documentação automática.
 * </p>
 *
 * @author HernaniFilho
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de requisição para criação ou atualização de uma tag")
public class TagRequestDTO {
    
    @NotBlank(message = "O nome da tag é obrigatório")
    @Size(min = 2, max = 255, message = "O nome da tag deve ter entre 2 e 255 caracteres")
    @Schema(description = "Nome da tag", example = "Eletrônicos", required = true)
    private String name;

    @Schema(description = "Descrição da tag", example = "Produtos relacionados a eletrônicos e gadgets")
    private String description;
}
