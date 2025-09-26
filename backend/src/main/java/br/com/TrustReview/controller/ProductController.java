package br.com.TrustReview.controller;

import br.com.TrustReview.dto.ProductRequestDTO;
import br.com.TrustReview.dto.ProductResponseDTO;
import br.com.TrustReview.exception.ApiError;
import br.com.TrustReview.service.ProductService;
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
 * Controller responsável pelo gerenciamento dos endpoints de produtos.
 *
 * <p>
 * Disponibiliza operações para criação, consulta, atualização e remoção de produtos,
 * utilizando o serviço {@link ProductService} para a lógica de negócio.
 * </p>
 *
 * <ul>
 *   <li><b>POST /api/v1/products</b>: Cria um novo produto.</li>
 *   <li><b>GET /api/v1/products/{product-id}</b>: Busca um produto pelo ID.</li>
 *   <li><b>PATCH /api/v1/products/{product-id}</b>: Atualiza um produto existente.</li>
 *   <li><b>DELETE /api/v1/products/{product-id}</b>: Remove um produto pelo ID.</li>
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
@RequestMapping("/api/v1/products")
@Tag(name = "Product Endpoint", description = "Endpoint para gerenciamento de produtos (CRUD)")
public class ProductController {

    private final ProductService service;

    /**
     * Cria um novo produto.
     *
     * @param request DTO com os dados do produto a ser criado
     * @return Produto criado
     */
    @Operation(summary = "Cria um novo produto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Produto criado com sucesso",
            content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
            content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "Conflito - Produto com o mesmo nome já existe",
            content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping
    public ResponseEntity<ProductResponseDTO> create(@RequestBody @Valid ProductRequestDTO request) {
        ProductResponseDTO response = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Busca um produto pelo seu ID.
     *
     * @param id UUID do produto
     * @return Produto encontrado
     */
    @Operation(summary = "Busca um produto pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto encontrado com sucesso",
            content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado",
            content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @GetMapping("/{product-id}")
    public ResponseEntity<ProductResponseDTO> getById(@PathVariable("product-id") UUID id,
                                                      @RequestParam(name = "include", required = false) List<String> include) {
        return ResponseEntity.ok(service.getById(id, include));
    }

    /**
     * Atualiza um produto existente pelo seu ID.
     *
     * @param productId UUID do produto
     * @param request   DTO com os novos dados do produto
     * @return Produto atualizado
     */
    @Operation(summary = "Atualiza um produto pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso",
            content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Erro de validação",
            content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado",
            content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "Conflito - Produto com o mesmo nome já existe",
                    content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @PatchMapping("/{product-id}")
    public ResponseEntity<ProductResponseDTO> update(@PathVariable("product-id") UUID productId,
                                                     @RequestBody @Valid ProductRequestDTO request) {
        return ResponseEntity.ok(service.update(productId, request));
    }

    /**
     * Remove um produto pelo seu ID.
     *
     * @param productId UUID do produto
     * @return Resposta sem conteúdo em caso de sucesso
     */
    @Operation(summary = "Deleta um produto pelo id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Produto deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado",
            content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
            content = @Content(schema = @Schema(implementation = ApiError.class)))
    })
    @DeleteMapping("/{product-id}")
    public ResponseEntity<Void> delete(@PathVariable("product-id") UUID productId) {
        service.delete(productId);
        return ResponseEntity.noContent().build();
    }
}
