package br.com.TrustReview.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

/**
 * Controller responsável pelo gerenciamento dos endpoints de {@code User}.
 *
 * <p>
 * Disponibiliza operações REST para criação, consulta, atualização, remoção e autenticação de usuários,
 * delegando a lógica de negócio ao serviço {@link br.com.TrustReview.service.UserService}.
 * Utiliza anotações Swagger/OpenAPI para documentação automática dos endpoints.
 * </p>
 *
 * <ul>
 *   <li><b>createUser</b>: Cria um novo usuário.</li>
 *   <li><b>getUserByEmail</b>: Busca um usuário pelo email.</li>
 *   <li><b>getUserById</b>: Busca um usuário pelo ID (UUID).</li>
 *   <li><b>updateUser</b>: Atualiza parcialmente um usuário (PATCH).</li>
 *   <li><b>putUser</b>: Substitui totalmente os dados do usuário (PUT).</li>
 *   <li><b>deleteUser</b>: Remove um usuário pelo ID.</li>
 *   <li><b>login</b>: Autentica um usuário (login).</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Tag(name = "User Endpoint", description = "Endpoint para gerenciamento de Usuários (CRUD)")
public class UserController {

        private final UserService userService;

        /**
         * Cria um novo usuário.
         *
         * @param userRequestDTO DTO com os dados do usuário a ser criado
         * @return ResponseEntity contendo o {@link UserResponseDTO} criado e status 201 Created
         */
        @Operation(summary = "Cria um novo Usuário")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso",
                        content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
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

        /**
         * Busca um usuário pelo email.
         *
         * @param userEmail email do usuário (path variable)
         * @return ResponseEntity contendo o {@link UserResponseDTO} e status 200 OK se encontrado
         */
        @Operation(summary = "Busca Usuário pelo email")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "Usuário encontrado com sucesso",
                        content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
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

        /**
         * Busca um usuário pelo identificador (UUID).
         *
         * @param userId UUID do usuário (path variable)
         * @return ResponseEntity contendo o {@link UserResponseDTO} e status 200 OK se encontrado
         */
        @Operation(summary = "Busca Usuário pelo id")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "Usuário encontrado com sucesso",
                        content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
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

        /**
         * Atualiza parcialmente um usuário (PATCH).
         *
         * @param userId  UUID do usuário a ser atualizado
         * @param request mapa com os campos e valores a alterar
         * @return ResponseEntity contendo o {@link UserResponseDTO} atualizado e status 200 OK
         */
        @Operation(summary = "Alterar Usuário pelo id")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "Usuário atualizado com sucesso",
                        content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
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
                return ResponseEntity.ok(userService.patchUserById(userId, request));
        }

        /**
         * Remove um usuário pelo identificador.
         *
         * @param userId UUID do usuário a ser deletado
         * @return ResponseEntity com status 204 No Content em caso de sucesso
         */
        @Operation(summary = "Deleta Usuário pelo id")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "204", description = "Usuário deletado com sucesso"),
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

        /**
         * Substitui totalmente os dados de um usuário (PUT).
         *
         * @param userId  UUID do usuário a ser substituído
         * @param request novo estado do usuário (validação aplicada)
         * @return ResponseEntity contendo o {@link UserResponseDTO} atualizado e status 200 OK
         */
        @Operation(summary = "Alterar Usuário pelo id")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "Usuário atualizado com sucesso",
                        content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
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

        /**
         * Realiza o login de um usuário.
         *
         * @param loginRequest DTO com credenciais de login
         * @return ResponseEntity contendo o {@link UserResponseDTO} e status 200 OK em caso de sucesso
         */
        @Operation(summary = "Faz login do Usuário")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "Usuário fez login com sucesso",
                        content = @Content(schema = @Schema(implementation = UserResponseDTO.class))),
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
