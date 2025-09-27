package br.com.TrustReview.dto;

import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO de resposta para informações de uma tag.
 *
 * <p>
 * Esta classe é utilizada para transferir dados da tag entre as camadas da aplicação,
 * especialmente nas respostas das APIs. Inclui informações como identificador, nome e descrição da tag.
 * </p>
 *
 * <ul>
 *   <li><b>tagId</b>: Identificador único da tag (UUID).</li>
 *   <li><b>name</b>: Nome da tag.</li>
 *   <li><b>description</b>: Descrição da tag.</li>
 * </ul>
 *
 * <p>
 * Utiliza anotações do Swagger para documentação automática.
 * </p>
 *
 * @author HernaniFilho
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de resposta para informações da tag")
public class TagResponseDTO {
    
    @Schema(description = "ID da tag", example = "3fa85f64-5717-4562-b3fc-2c963f66afa6")
    private UUID id;

    @Schema(description = "Nome da tag", example = "Eletrônicos")
    private String name;

    @Schema(description = "Descrição da tag", example = "Produtos relacionados a eletrônicos e gadgets")
    private String description;
}
