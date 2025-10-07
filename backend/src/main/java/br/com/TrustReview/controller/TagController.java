package br.com.TrustReview.controller;

import br.com.TrustReview.dto.ProductRequestDTO;
import br.com.TrustReview.dto.ProductResponseDTO;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller responsável pelo gerenciamento dos endpoints de {@link br.com.TrustReview.model.Tag}.
 *
 * <p>
 * Disponibiliza operações REST para criação, consulta, atualização e remoção de tags,
 * delegando a lógica de negócio ao serviço {@link br.com.TrustReview.service.TagService}.
 * Utiliza anotações Swagger/OpenAPI para documentação automática dos endpoints.
 * </p>
 *
 * <ul>
 *   <li><b>create</b>: Cria uma nova tag.</li>
 *   <li><b>getById</b>: Busca uma tag pelo ID.</li>
 *   <li><b>getAll</b>: Lista todas as tags, podendo incluir produtos associados.</li>
 *   <li><b>update</b>: Atualiza uma tag existente pelo ID.</li>
 *   <li><b>delete</b>: Remove uma tag pelo ID.</li>
 * </ul>
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

    /**
     * Busca uma tag pelo seu ID.
     *
     * @param id UUID da tag
     * @return Tag encontrada
     */
    @Operation(summary = "Busca uma tag pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tag encontrada com sucesso",
                    content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Tag não encontrada",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/{tag-id}")
    public ResponseEntity<TagResponseDTO> getById(@PathVariable("tag-id") UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }

    /**
     * Busca todas as tags.
     *
     * @param includeProducts Indica se os produtos associados às tags devem ser incluídos na resposta
     * @return Lista de tags encontradas
     */
    @Operation(summary = "Busca todas as tags")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tags encontradas com sucesso",
                    content = @Content(schema = @Schema(implementation = TagResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Nenhuma tag encontrada",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping
    public ResponseEntity<List<TagResponseDTO>> getAll(@RequestParam(name = "includeProducts", required = false, defaultValue = "false") boolean includeProducts){
        return ResponseEntity.ok(service.getAll(includeProducts));
    }

    /**
     * Atualiza uma tag existente pelo seu ID.
     *
     * @param tagId UUID do tag
     * @param request DTO com os novos dados do tag
     * @return Tag atualizado
     */
    @Operation(summary = "Atualiza um tag pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tag atualizada com sucesso",
                    content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Tag não encontrada",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "Conflito - Tag com o mesmo nome já existe",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PatchMapping("/{tag-id}")
    public ResponseEntity<TagResponseDTO> update(@PathVariable("tag-id") UUID tagId,
                                                     @RequestBody @Valid TagRequestDTO request) {
        return ResponseEntity.ok(service.update(tagId, request));
    }

    /**
     * Remove uma tag pelo seu ID.
     *
     * @param tagId UUID do tag
     * @return Resposta sem conteúdo em caso de sucesso
     */
    @Operation(summary = "Deleta uma tag pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Tag deletada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Tag não encontrada",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{tag-id}")
    public ResponseEntity<Void> delete(@PathVariable("tag-id") UUID tagId) {
        service.delete(tagId);
        return ResponseEntity.noContent().build();
    }
}
