package br.com.TrustReview.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO para requisição de login do usuário.
 *
 * <p>
 * Representa os dados esperados em uma chamada de API para autenticação (login).
 * Contém apenas os campos necessários para identificação e validação das credenciais.
 * Validações são aplicadas via Jakarta Validation e anotações do Swagger/OpenAPI
 * fornecem documentação automática.
 * </p>
 *
 * Campos:
 * <ul>
 *   <li><b>email</b> - Endereço de e-mail do usuário. Obrigatório, entre 6 e 80 caracteres.</li>
 *   <li><b>password</b> - Senha do usuário. Obrigatório, entre 8 e 50 caracteres.</li>
 * </ul>
 *
 * Observações:
 * <ul>
 *   <li>Não contém ID — é destinado exclusivamente a operações de entrada (request).</li>
 *   <li>Regras de autenticação (verificação de senha, geração de token) devem ser executadas na camada de serviço.</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para requisição de login do usuário")
public class UserRequestLoginDTO {

    @NotBlank(message = "Usuário deve conter email")
    @Size(min = 6, max = 80, message = "O email do usuário deve ter entre 6 e 80 caracteres")
    @Schema(description = "Email do usuário", example = "hugosilva@hotmail.com", required = true)
    private String email;


    @NotBlank(message = "Usuário deve conter senha")
    @Size(min = 8, max = 50, message = "A senha do usuário deve ter entre 8 e 255 caracteres")
    @Schema(description = "Senha do usuário", required = true)
    private String password;
}
