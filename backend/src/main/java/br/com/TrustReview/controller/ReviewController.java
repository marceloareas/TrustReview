package br.com.TrustReview.controller;

import br.com.TrustReview.dto.ReviewRequestDTO;
import br.com.TrustReview.dto.ReviewPutRequestDTO;
import br.com.TrustReview.dto.ReviewResponseDTO;
import br.com.TrustReview.exception.ApiError;
import br.com.TrustReview.exception.ProductNotFound;
import br.com.TrustReview.exception.ReviewNotFound;
import br.com.TrustReview.exception.UserNotFound;
import br.com.TrustReview.service.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller responsável pelos endpoints de {@link br.com.TrustReview.model.Review}.
 *
 * <p>
 * Oferece operações REST para criação, consulta, atualização e exclusão de avaliações,
 * bem como listagem de avaliações por produto e filtragem por nota mínima.
 * A lógica de negócio é delegada ao {@link ReviewService}.
 * </p>
 *
 * <ul>
 *   <li><b>create</b>: Cria uma nova avaliação.</li>
 *   <li><b>getById</b>: Busca uma avaliação pelo usuário e produto.</li>
 *   <li><b>getAllByProduct</b>: Lista avaliações de um produto com paginação.</li>
 *   <li><b>getHighRated</b>: Lista avaliações com nota mínima especificada.</li>
 *   <li><b>update</b>: Atualiza uma avaliação existente.</li>
 *   <li><b>delete</b>: Remove uma avaliação.</li>
 * </ul>
 *
 * @author Jean
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reviews")
@Tag(name = "Review Endpoint", description = "Endpoint para gerenciamento de avaliações (CRUD e filtros)")
public class ReviewController {

    private final ReviewService service;

    /**
     * Cria uma nova avaliação.
     *
     * @param request DTO com os dados da avaliação
     * @return Avaliação criada
     */
    @Operation(summary = "Cria uma nova avaliação")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Avaliação criada com sucesso",
                    content = @Content(schema = @Schema(implementation = ReviewResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação ou usuário já avaliou o produto",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Usuário ou produto não encontrado",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping
    public ResponseEntity<ReviewResponseDTO> create(@RequestBody @Valid ReviewRequestDTO request) {
        ReviewResponseDTO response = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Busca uma avaliação específica (usuário + produto).
     *
     * @param userId ID do usuário
     * @param productId ID do produto
     * @return Avaliação correspondente
     */
    @Operation(summary = "Busca uma avaliação específica (usuário + produto)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Avaliação encontrada com sucesso",
                    content = @Content(schema = @Schema(implementation = ReviewResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Avaliação, usuário ou produto não encontrado",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/{user-id}/{product-id}")
    public ResponseEntity<ReviewResponseDTO> getById(
            @PathVariable("user-id") UUID userId,
            @PathVariable("product-id") UUID productId) {
        return ResponseEntity.ok(service.getById(userId, productId));
    }

    /**
     * Lista todas as avaliações de um produto específico, com paginação.
     *
     * @param productId ID do produto
     * @param page Página (padrão: 0)
     * @param size Tamanho da página (padrão: 10)
     * @return Página de avaliações
     */
    @Operation(summary = "Lista avaliações de um produto específico (com paginação)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Avaliações encontradas com sucesso",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ReviewResponseDTO.class)))),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado ou sem avaliações",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/product/{product-id}")
    public ResponseEntity<Page<ReviewResponseDTO>> getAllByProduct(
            @PathVariable("product-id") UUID productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getAllByProduct(productId, page, size));
    }

    /**
     * Busca avaliações com nota mínima especificada.
     *
     * @param minRating nota mínima
     * @return Lista de avaliações com nota >= minRating
     */
    @Operation(summary = "Busca avaliações com nota mínima especificada")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Avaliações encontradas com sucesso",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ReviewResponseDTO.class)))),
            @ApiResponse(responseCode = "404", description = "Nenhuma avaliação encontrada com a nota mínima",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/filter")
    public ResponseEntity<List<ReviewResponseDTO>> getHighRated(
            @RequestParam("minRating") Double minRating) {
        return ResponseEntity.ok(service.getHighRated(minRating));
    }

    /**
     * Atualiza uma avaliação existente.
     *
     * @param userId ID do usuário
     * @param productId ID do produto
     * @param request DTO com os novos dados
     * @return Avaliação atualizada
     */
    @Operation(summary = "Atualiza uma avaliação existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Avaliação atualizada com sucesso",
                    content = @Content(schema = @Schema(implementation = ReviewResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Avaliação, usuário ou produto não encontrado",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PatchMapping("/{user-id}/{product-id}")
    public ResponseEntity<ReviewResponseDTO> update(
            @PathVariable("user-id") UUID userId,
            @PathVariable("product-id") UUID productId,
            @RequestBody @Valid ReviewPutRequestDTO request) {
        ReviewResponseDTO updated = service.update(userId, productId, request);
        return ResponseEntity.ok(updated);
    }


    /**
     * Remove uma avaliação existente.
     *
     * @param userId ID do usuário
     * @param productId ID do produto
     * @return Resposta sem conteúdo
     */
    @Operation(summary = "Remove uma avaliação existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Avaliação removida com sucesso"),
            @ApiResponse(responseCode = "404", description = "Avaliação, usuário ou produto não encontrado",
                    content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{user-id}/{product-id}")
    public ResponseEntity<Void> delete(
            @PathVariable("user-id") UUID userId,
            @PathVariable("product-id") UUID productId) {
        service.delete(userId, productId);
        return ResponseEntity.noContent().build();
    }
}
