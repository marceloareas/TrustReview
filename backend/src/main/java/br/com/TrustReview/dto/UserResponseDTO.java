package br.com.TrustReview.dto;

import br.com.TrustReview.model.UserTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de resposta para informações de usuário")
public class UserResponseDTO {

    @Schema(description = "ID do usuário")
    private UUID id;

    @Schema(description = "Nome do usuário", example = "Hugo da Silva")
    private String name;

    @Schema(description = "Email do usuário", example = "hugosilva@hotmail.com")
    private String email;

    @Schema(description = "Senha do usuário")
    private String password;

    @Schema(description = "Tipo do usuário", example = "ADMIN")
    private UserTypeEnum userType;

}
