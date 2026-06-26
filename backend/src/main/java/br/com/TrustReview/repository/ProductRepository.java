package br.com.TrustReview.repository;

import br.com.TrustReview.model.Product;
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
 * Repositório responsável pelas operações de persistência da entidade {@link Product}.
 *
 * <p>
 * Disponibiliza métodos para manipulação e consulta de produtos no banco de dados,
 * incluindo buscas customizadas por nome, tags e produtos relacionados.
 * Utiliza o Spring Data JPA para abstração das operações CRUD e geração automática das implementações.
 * </p>
 *
 * <ul>
 *   <li><b>findByName</b>: Busca um produto pelo nome.</li>
 *   <li><b>findAllWithTags</b>: Lista todos os produtos com suas tags associadas.</li>
 *   <li><b>findProductsByTagsId</b>: Lista produtos vinculados a uma tag específica.</li>
 *   <li><b>findRelatedProducts</b>: Busca produtos relacionados por tags compartilhadas, excluindo o produto de origem.</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    /**
     * Retorna um produto pelo nome.
     *
     * @param name Nome do produto
     * @return Optional contendo o produto, se encontrado
     */
    Optional<Product> findByName(String name);

    /**
     * Retorna todos os produtos com suas tags associadas.
     *
     * @return Lista de produtos com tags
     */
    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.tags")
    List<Product> findAllWithTags();

    /**
     * Retorna todos os produtos associados a uma tag específica.
     *
     * @param tagId UUID da tag
     * @return Lista de produtos associados à tag informada
     */
    List<Product> findProductsByTagsId(UUID tagId);

    @Query("""
        SELECT p
        FROM Product p
        JOIN p.tags t
        WHERE t IN (
            SELECT t2 FROM Product p2 JOIN p2.tags t2 WHERE p2.id = :productId
        )
        AND p.id <> :productId
        GROUP BY p.id, p.name, p.description, p.overallRating, p.imageUrl, p.createdAt, p.updatedAt
        ORDER BY COUNT(t) DESC
        """)
    Page<Product> findRelatedProducts(
            @Param("productId") UUID productId,
            Pageable pageable
    );

    /**
     * Retorna produtos que possuem TODAS as tags informadas (AND).
     *
     * @param tagIds Lista de UUIDs das tags
     * @param tagCount Quantidade de tags distintas a casar
     * @return Lista de produtos (sem duplicatas)
     */
    @Query("""
        SELECT p FROM Product p
        JOIN p.tags t
        WHERE t.id IN :tagIds
        GROUP BY p.id, p.name, p.description, p.overallRating, p.imageUrl, p.summary, p.prosSummary, p.consSummary, p.createdAt, p.updatedAt
        HAVING COUNT(DISTINCT t.id) = :tagCount
        """)
    List<Product> findByTagIds(@Param("tagIds") List<UUID> tagIds, @Param("tagCount") long tagCount);
}