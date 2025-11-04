package br.com.TrustReview.repository;

import br.com.TrustReview.model.Review;
import br.com.TrustReview.model.ProductReviewId;
import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repositório responsável por operações de persistência relacionadas à entidade {@link Review}.
 *
 * <p>
 * Essa interface herda de {@link JpaRepository}, oferecendo métodos CRUD e suporte a paginação
 * e ordenação automaticamente. Além disso, inclui consultas customizadas via JPQL
 * para operações específicas relacionadas a avaliações.
 * </p>
 *
 * <p>
 * A entidade {@link Review} utiliza uma chave composta ({@link ProductReviewId}),
 * composta pelos campos {@code userId} e {@code productId}.
 * </p>
 *
 * <p><b>Exemplo de uso:</b></p>
 * <pre>{@code
 * List<Review> reviews = reviewRepository.findByProductId(product);
 * Optional<Review> review = reviewRepository.findByUserIdAndProductId(user, product);
 * }</pre>
 *
 * @author Jean
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, ProductReviewId> {

    /**
     * Busca uma avaliação específica feita por um usuário sobre um produto.
     *
     * @param user    Usuário que realizou a avaliação.
     * @param product Produto avaliado.
     * @return Avaliação correspondente, se existir.
     */
    Optional<Review> findByUserIdAndProductId(User user, Product product);

    /**
     * Lista todas as avaliações associadas a um determinado produto.
     *
     * @param product Produto avaliado.
     * @return Lista de avaliações do produto.
     */
    List<Review> findByProductId(Product product);

    /**
     * Lista todas as avaliações realizadas por um determinado usuário.
     *
     * @param user Usuário que realizou as avaliações.
     * @return Lista de avaliações feitas pelo usuário.
     */
    List<Review> findByUserId(User user);

    /**
     * Busca avaliações de um produto com suporte a paginação.
     *
     * @param product  Produto avaliado.
     * @param pageable Configuração de paginação e ordenação.
     * @return Página contendo avaliações do produto.
     */
    Page<Review> findByProductId(Product product, Pageable pageable);

    /**
     * Busca todas as avaliações com nota superior a um determinado valor.
     *
     * @param minRating Nota mínima de filtro.
     * @return Lista de avaliações com nota maior ou igual ao valor especificado.
     */
    List<Review> findByRatingGreaterThanEqual(Double minRating);

    /**
     * Conta o número total de avaliações associadas a um determinado produto.
     *
     * <p>
     * Este método retorna a quantidade de registros de {@link Review}
     * existentes no banco de dados que estão vinculados ao produto informado.
     * É útil para exibir a quantidade total de avaliações de um produto ou
     * para cálculos estatísticos, como o ajuste da nota média.
     * </p>
     *
     * <p><b>Exemplo de uso:</b></p>
     * <pre>{@code
     * Product product = productRepository.findById(productId).get();
     * long totalReviews = reviewRepository.countByProductId(product);
     * }</pre>
     *
     * @param Product_id Produto para o qual as avaliações serão contadas.
     * @return Número total de avaliações associadas ao produto.
     */
    int countByProductId(Product product);


    /**
     * Consulta JPQL para retornar as avaliações mais curtidas de um produto.
     *
     * @param productId ID do produto.
     * @param pageable  Configuração de paginação.
     * @return Página com avaliações mais curtidas.
     */
    /*
    @Query("""
        SELECT r
        FROM reviews r
        WHERE r.product_Id = :product_Id
        ORDER BY r.likes DESC
    """)
    Page<Review> findTopLikesReviewsByProduct(
            @Param("productId") Product productId,
            Pageable pageable
    );
    */


    /**
     * Busca todas as avaliações de produtos que possuam média de nota acima de certo limiar.
     *
     * <p>Essa consulta faz uma agregação por produto, calculando a média das notas.</p>
     *
     * @param minAverageRating Nota média mínima.
     * @return Lista de produtos com suas avaliações médias acima do valor informado.
     */
    /*
    @Query("""
        SELECT r.product_Id
        FROM reviews r
        GROUP BY r.product_Id
        HAVING AVG(r.rating) >= :minAverageRating
    """)
    List<Product> findProductsWithAverageRatingAbove(
            @Param("minAverageRating") Double minAverageRating
    );
    */
}
