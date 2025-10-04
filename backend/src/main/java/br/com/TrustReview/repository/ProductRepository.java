package br.com.TrustReview.repository;

import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.Tag;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para operações de acesso a dados da entidade {@link Product}.
 *
 * <p>
 * Esta interface fornece métodos para manipulação de produtos no banco de dados,
 * incluindo operações CRUD padrão e consultas customizadas
 * </p>
 *
 * <ul>
 *   <li><b>findByName</b>: Busca um produto pelo nome.</li>
 *   <li><b>findAllByTagId</b>: Busca todos os produtos associados a uma determinada tag pelo seu ID.</li>
 * </ul>
 *
 * <p>
 * Utiliza Spring Data JPA para geração automática das implementações e otimização de queries.
 * </p>
 *
 * @author HernaniFilho
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    /**
     * Busca um produto pelo nome.
     *
     * @param name Nome do produto
     * @return Optional contendo o produto, se encontrado, se não, vazio
     */
    Optional<Product> findByName(String name);

    /**
     * Busca todos os produtos com tags
     * @return List contendo os produtos com tags, se encontrado, se não, vazio
     */
    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.tags")
    List<Product> findAllWithTags();

    /**
     * Busca todos os produtos associadas a uma tag específica.
     *
     * @param tagId UUID da tag cujos produtos devem ser retornadas
     * @return Lista de products associadas ao produto
     */
    List<Product> findProductsByTagsId(UUID tagId);
}
