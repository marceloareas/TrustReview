package br.com.TrustReview.controller;

import br.com.TrustReview.dto.TagRequestDTO;
import br.com.TrustReview.dto.TagResponseDTO;
import br.com.TrustReview.exception.ApiError;
import br.com.TrustReview.service.ProductService;
import br.com.TrustReview.service.TagService;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller responsável pelo gerenciamento dos endpoints de tags.
 *
 * <p>
 * Disponibiliza operações para criação, consulta, atualização e remoção de tags,
 * utilizando o serviço {@link TagService} para a lógica de negócio.
 * </p>
 *
 * <ul>
 *   <li><b>POST /api/v1/tags</b>: Cria uma nova tag.</li>
 *   <li><b>GET /api/v1/tags/{tag-id}</b>: Busca uma tag pelo ID.</li>
 *   <li><b>PATCH /api/v1/tags/{tag-id}</b>: Atualiza uma tag existente.</li>
 *   <li><b>DELETE /api/v1/tags/{tag-id}</b>: Remove uma tag pelo ID.</li>
 * </ul>
 *
 * <p>
 * Utiliza anotações do Swagger/OpenAPI para documentação automática dos endpoints.
 * </p>
 *
 * @author HernaniFilho
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tags")
@Tag(name = "Tag Endpoint", description = "Endpoint para gerenciamento das tags (CRUD)")
public class TagController {

    private final TagService service;

    /**
     * Cria uma nova tag.
     *
     * @param request DTO com os dados da tag a ser criada
     * @return Tag criada
     */
    @Operation(summary = "Cria um nova tag")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Tag criada com sucesso",
                    content = @Content(schema = @Schema(implementation = TagResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "Conflito - Tag com o mesmo nome já existe",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping
    public ResponseEntity<TagResponseDTO> create(@RequestBody @Valid TagRequestDTO request) {
        TagResponseDTO response = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
