package br.com.TrustReview.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para requiisição de login do usuário")
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
