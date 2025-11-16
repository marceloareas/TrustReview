package br.com.TrustReview.dto;

import java.util.UUID;

import br.com.TrustReview.model.User;
import br.com.TrustReview.model.UserTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO de resposta para informações de usuário.
 *
 * <p>
 * Esta classe é utilizada para transferir dados do usuário entre as camadas da aplicação,
 * principalmente nas respostas das APIs. Contém informações básicas do usuário que podem
 * ser retornadas ao cliente (em ambientes reais, evite expor a senha).
 * </p>
 *
 * <ul>
 *   <li><b>id</b>: Identificador único do usuário (UUID).</li>
 *   <li><b>name</b>: Nome completo do usuário.</li>
 *   <li><b>email</b>: Endereço de e-mail do usuário.</li>
 *   <li><b>password</b>: Senha do usuário (presente por compatibilidade; não expor em APIs públicas).</li>
 *   <li><b>userType</b>: Tipo do usuário conforme {@link br.com.TrustReview.model.UserTypeEnum}.</li>
 * </ul>
 *
 * <p>
 * Utiliza anotações do Swagger/OpenAPI para documentação automática dos campos.
 * </p>
 *
 * @author HernaniFilho
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de resposta para informações de usuário")
public class UserResponseDTO {

    @Schema(description = "ID do usuário", example = "3fa85f64-5717-4562-b3fc-2c963f66afa6")
    private UUID id;

    @Schema(description = "Nome do usuário", example = "Hugo da Silva")
    private String name;

    @Schema(description = "Email do usuário", example = "hugosilva@hotmail.com")
    private String email;

    @Schema(description = "Senha do usuário (não recomendado expor em produção)", example = "********")
    private String password;

    @Schema(description = "Tipo do usuário", example = "COSTUMER")
    private UserTypeEnum userType;
}