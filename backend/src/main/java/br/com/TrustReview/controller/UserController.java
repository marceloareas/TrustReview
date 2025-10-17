package br.com.TrustReview.controller;

import br.com.TrustReview.dto.TagResponseDTO;
import br.com.TrustReview.dto.UserRequestDTO;
import br.com.TrustReview.dto.UserRequestLoginDTO;
import br.com.TrustReview.dto.UserResponseDTO;
import br.com.TrustReview.exception.ApiError;
import br.com.TrustReview.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Tag(name = "User Endpoint", description = "Endpoint para gerenciamento de Usuários (CRUD)")
public class UserController {

    private final UserService userService;

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
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody @Valid UserRequestDTO userRequestDTO) {
        UserResponseDTO userResponseDTO = userService.createUser(userRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponseDTO);
    }

    @Operation(summary = "Busca Usuário pelo email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário encontrado com sucesso",
                    content = @Content(schema = @Schema(implementation = TagResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "User não encontrado",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/email/{userEmail}")
    public ResponseEntity<UserResponseDTO> getUserByEmail(@PathVariable("userEmail") String userEmail) {
        return ResponseEntity.ok(userService.getUserByEmail(userEmail));
    }

    @Operation(summary = "Busca Usuário pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário encontrado com sucesso",
                    content = @Content(schema = @Schema(implementation = TagResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "User não encontrado",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/id/{userId}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable("userId") UUID userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @Operation(summary = "Alterar Usuário pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário encontrado com sucesso",
                    content = @Content(schema = @Schema(implementation = TagResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "User não encontrado",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PatchMapping("{userId}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable("userId") UUID userId,
                                           @RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(userService.patchUserById(userId,request));
    }

    @Operation(summary = "Deleta Usuário pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Usuário encontrado com sucesso",
                    content = @Content(schema = @Schema(implementation = TagResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "User não encontrado",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable("userId") UUID userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Alterar Usuário pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário encontrado com sucesso",
                    content = @Content(schema = @Schema(implementation = TagResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "User não encontrado",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PutMapping("{userId}")
    public ResponseEntity<UserResponseDTO> putUser(@PathVariable("userId") UUID userId,
                                                   @RequestBody @Valid UserRequestDTO request) {
        return ResponseEntity.ok(userService.putUserById(userId, request));
    }

    @Operation(summary = "Faz login do Usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário fez login com sucesso",
                    content = @Content(schema = @Schema(implementation = TagResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "User não encontrado",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserRequestLoginDTO loginRequest) {
        return ResponseEntity.ok(userService.loginUser(loginRequest));
    }

}
