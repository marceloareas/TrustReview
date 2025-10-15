package br.com.TrustReview.dto;

import br.com.TrustReview.model.UserTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
