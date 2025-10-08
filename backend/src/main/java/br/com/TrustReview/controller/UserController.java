package br.com.TrustReview.controller;

import br.com.TrustReview.dto.TagResponseDTO;
import br.com.TrustReview.exception.ApiError;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@RestController
@RequestMapping("/user")
public class UserController {
    @Operation(summary = "Cria um novo Usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso",
                    content = @Content(schema = @Schema(implementation = TagResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "Conflito - User com o mesmo email já existe",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping
    public String UerController(){
        return "UserController";
    }


}
