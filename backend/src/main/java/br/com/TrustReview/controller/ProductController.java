package br.com.TrustReview.controller;

import br.com.TrustReview.dto.ProductPageDTO;
import br.com.TrustReview.dto.ProductRequestDTO;
import br.com.TrustReview.dto.ProductResponseDTO;
import br.com.TrustReview.exception.ApiError;
import br.com.TrustReview.exception.ProductNotFound;
import br.com.TrustReview.model.Product;
import br.com.TrustReview.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * Controller responsável pelo gerenciamento dos endpoints de {@link Product}.
 *
 * <p>
 * Disponibiliza operações REST para criação, consulta, atualização, remoção e
 * busca de produtos relacionados,
 * delegando a lógica de negócio ao serviço {@link ProductService}.
 * Utiliza anotações Swagger/OpenAPI para documentação automática dos endpoints.
 * </p>
 *
 * <ul>
 * <li><b>create</b>: Cria um novo produto.</li>
 * <li><b>getById</b>: Busca um produto pelo ID.</li>
 * <li><b>getAll</b>: Lista todos os produtos, podendo incluir tags
 * associadas.</li>
 * <li><b>getRelatedProducts</b>: Busca produtos relacionados por tags
 * compartilhadas.</li>
 * <li><b>update</b>: Atualiza um produto existente pelo ID.</li>
 * <li><b>delete</b>: Remove um produto pelo ID.</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
@Tag(name = "Product Endpoint", description = "Endpoint para gerenciamento de produtos (CRUD)")
public class ProductController {

        private final ProductService service;
        private final ObjectMapper objectMapper;

        /**
         * Cria um novo produto.
         *
         * @param request DTO com os dados do produto a ser criado
         * @return Produto criado
         */
        @Operation(summary = "Cria um novo produto")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Produto criado com sucesso", content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
                        @ApiResponse(responseCode = "400", description = "Erro de validação", content = @Content(schema = @Schema(implementation = ApiError.class))),
                        @ApiResponse(responseCode = "409", description = "Conflito - Produto com o mesmo nome já existe", content = @Content(schema = @Schema(implementation = ApiError.class))),
                        @ApiResponse(responseCode = "500", description = "Erro interno do servidor", content = @Content(schema = @Schema(implementation = ApiError.class)))
        })
        @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<ProductResponseDTO> create(
                        @RequestPart(value = "data", required = false) MultipartFile dataPart,
                        @RequestPart(value = "image", required = false) MultipartFile image) {
                ProductRequestDTO requestDto = null;
                try {
                        if (dataPart != null && !dataPart.isEmpty()) {
                                String json = new String(dataPart.getBytes(), StandardCharsets.UTF_8);
                                requestDto = objectMapper.readValue(json, ProductRequestDTO.class);
                        } else {
                                throw new IllegalArgumentException("Parte 'data' faltando ou vazia");
                        }
                } catch (IOException e) {
                        throw new RuntimeException("Erro ao ler parte JSON 'data'", e);
                }

                ProductResponseDTO response = service.create(requestDto, image);
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
                        @ApiResponse(responseCode = "200", description = "Produto encontrado com sucesso", content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
                        @ApiResponse(responseCode = "404", description = "Produto não encontrado", content = @Content(schema = @Schema(implementation = ApiError.class))),
                        @ApiResponse(responseCode = "500", description = "Erro interno do servidor", content = @Content(schema = @Schema(implementation = ApiError.class)))
        })
        @GetMapping("/{product-id}")
        public ResponseEntity<ProductResponseDTO> getById(@PathVariable("product-id") UUID id,
                        @RequestParam(name = "include", required = false) List<String> include) {
                return ResponseEntity.ok(service.getById(id, include));
        }

        /**
         * Busca todos os produtos.
         * 
         * @param include Indica se deve incluir as tags associadas aos produtos na
         *                resposta
         * @return Lista com todos os produtos
         */
        @Operation(summary = "Busca todos os produtos")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Produtos encontrados com sucesso", content = @Content(array = @ArraySchema(schema = @Schema(implementation = ProductResponseDTO.class)))),
                        @ApiResponse(responseCode = "404", description = "Produtos não encontrados", content = @Content(schema = @Schema(implementation = ApiError.class))),
                        @ApiResponse(responseCode = "500", description = "Erro interno do servidor", content = @Content(schema = @Schema(implementation = ApiError.class)))
        })
        @GetMapping
        public ResponseEntity<List<ProductResponseDTO>> getAll(
                        @RequestParam(name = "includeTags", required = false, defaultValue = "false") boolean include) {
                return ResponseEntity.ok(service.getAll(include));
        }

        /**
         * Busca produtos relacionados por tags.
         *
         * @param productId UUID do produto
         * @param page      Número da página (padrão: 0)
         * @param size      Tamanho da página (padrão: 10)
         * @return Página de produtos relacionados
         */
        @Operation(summary = "Busca produtos relacionados por tags")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Produtos relacionados encontrados com sucesso", content = @Content(array = @ArraySchema(schema = @Schema(implementation = ProductPageDTO.class)))),
                        @ApiResponse(responseCode = "404", description = "Produto não encontrado", content = @Content(schema = @Schema(implementation = ApiError.class))),
                        @ApiResponse(responseCode = "500", description = "Erro interno do servidor", content = @Content(schema = @Schema(implementation = ApiError.class)))
        })
        @GetMapping("/{product-id}/related")
        public ResponseEntity<ProductPageDTO> getRelatedProducts(
                        @PathVariable("product-id") UUID productId,
                        @RequestParam(name = "page", defaultValue = "0") int page,
                        @RequestParam(name = "size", defaultValue = "10") int size) {
                return ResponseEntity.ok(service.getRelatedProducts(productId, page, size));
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
                        @ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso", content = @Content(schema = @Schema(implementation = ProductResponseDTO.class))),
                        @ApiResponse(responseCode = "400", description = "Erro de validação", content = @Content(schema = @Schema(implementation = ApiError.class))),
                        @ApiResponse(responseCode = "404", description = "Produto não encontrado", content = @Content(schema = @Schema(implementation = ApiError.class))),
                        @ApiResponse(responseCode = "409", description = "Conflito - Produto com o mesmo nome já existe", content = @Content(schema = @Schema(implementation = ApiError.class))),
                        @ApiResponse(responseCode = "500", description = "Erro interno do servidor", content = @Content(schema = @Schema(implementation = ApiError.class)))
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
                        @ApiResponse(responseCode = "404", description = "Produto não encontrado", content = @Content(schema = @Schema(implementation = ApiError.class))),
                        @ApiResponse(responseCode = "500", description = "Erro interno do servidor", content = @Content(schema = @Schema(implementation = ApiError.class)))
        })
        @DeleteMapping("/{product-id}")
        public ResponseEntity<Void> delete(@PathVariable("product-id") UUID productId) {
                service.delete(productId);
                return ResponseEntity.noContent().build();
        }
}
