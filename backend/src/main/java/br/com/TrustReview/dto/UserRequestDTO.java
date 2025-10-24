package br.com.TrustReview.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO de requisição para criação ou atualização de um usuário.
 *
 * <p>
 * Esta classe representa os dados esperados em chamadas de API para criar ou atualizar
 * um usuário. Possui validações via Jakarta Validation (NotBlank, Size) e anotações
 * do Swagger/OpenAPI para documentação automática.
 * </p>
 *
 * Campos:
 * <ul>
 *   <li><b>name</b> - Nome completo do usuário. Obrigatório, entre 6 e 150 caracteres.</li>
 *   <li><b>email</b> - Endereço de e-mail do usuário. Obrigatório, entre 6 e 80 caracteres.</li>
 *   <li><b>password</b> - Senha do usuário. Obrigatório, entre 8 e 50 caracteres.</li>
 * </ul>
 *
 * Observações:
 * <ul>
 *   <li>Não contém ID — é destinado a operações de entrada (request).</li>
 *   <li>Regras adicionais (criptografia de senha, verificações de unicidade) devem ser
 *       aplicadas na camada de serviço.</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de requisição para criação ou atualização de um usuário")
public class UserRequestDTO {

    @NotBlank(message = "Usuário deve conter nome")
    @Size(min = 6, max = 150, message = "O nome do usuário deve ter entre 6 e 150 caracteres")
    @Schema(description = "Nome do usuário", example = "Hugo da Silva", required = true)
    private String name;

    @NotBlank(message = "Usuário deve conter email")
    @Size(min = 6, max = 80, message = "O email do usuário deve ter entre 6 e 80 caracteres")
    @Schema(description = "Email do usuário", example = "hugosilva@hotmail.com", required = true)
    private String email;

    @NotBlank(message = "Usuário deve conter senha")
    @Size(min = 8, max = 50, message = "A senha do usuário deve ter entre 8 e 255 caracteres")
    @Schema(description = "Senha do usuário", required = true)
    private String password;
}
