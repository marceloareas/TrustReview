package br.com.TrustReview.dto;

import br.com.TrustReview.model.Product;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * DTO que representa uma página de resultados de produtos.
 *
 * <p>
 * Utilizado para transportar uma página (conteúdo + metadados de paginação)
 * entre a camada de serviço/controlador e o cliente. Contém a lista de produtos
 * da página atual e informações de paginação como número da página, tamanho,
 * total de elementos, número total de páginas e se é a última página.
 * </p>
 *
 * Campos:
 * <ul>
 *   <li>content - lista de {@link Product} da página atual;</li>
 *   <li>pageNumber - índice da página atual (0-based);</li>
 *   <li>pageSize - número de elementos por página;</li>
 *   <li>totalElements - total de elementos disponíveis;</li>
 *   <li>totalPages - total de páginas disponíveis;</li>
 *   <li>last - indica se a página atual é a última página.</li>
 * </ul>
 *
 * Observações:
 * <ul>
 *   <li>Este DTO é agnóstico à implementação de paginação (Spring Page, custom, etc.).</li>
 *   <li>Campos numéricos seguem convenções comuns de paginação (pageNumber 0-based).</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO que representa uma página de resultados de produtos")
public class ProductPageDTO {

    @Schema(description = "Lista de produtos na página atual", implementation = Product.class)
    private List<Product> content;

    @Schema(description = "Número da página atual (0-based)", example = "0")
    private int pageNumber;

    @Schema(description = "Tamanho da página (quantidade de elementos por página)", example = "20")
    private int pageSize;

    @Schema(description = "Total de elementos disponíveis", example = "100")
    private long totalElements;

    @Schema(description = "Total de páginas disponíveis", example = "5")
    private int totalPages;

    @Schema(description = "Indica se esta é a última página", example = "false")
    private boolean last;
}
