package br.com.TrustReview.repository;

import br.com.TrustReview.model.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repositório para operações de acesso a dados da entidade {@link Product}.
 *
 * <p>
 * Esta interface fornece métodos para manipulação de produtos no banco de dados,
 * incluindo operações CRUD padrão e consultas customizadas, com suporte ao carregamento
 * de relacionamentos (tags) via {@link EntityGraph}.
 * </p>
 *
 * <ul>
 *   <li><b>findByName</b>: Busca um produto pelo nome.</li>
 *   <li><b>findWithTagsByName</b>: Busca um produto pelo nome, carregando também suas tags associadas.</li>
 *   <li><b>findWithTagsById</b>: Busca um produto pelo ID, carregando também suas tags associadas.</li>
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
     * Busca um produto pelo nome, carregando também suas tags associadas.
     *
     * @param name Nome do produto
     * @return Optional contendo o produto com tags, se encontrado, se não, vazio
     */
    @EntityGraph(attributePaths = {"tags"})
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) = LOWER(:name)")
    Optional<Product> findWithTagsByName(String name);

    /**
     * Busca um produto pelo ID, carregando também suas tags associadas.
     *
     * @param id ID do produto
     * @return Optional contendo o produto com tags, se encontrado, se não, vazio
     */
    @EntityGraph(attributePaths = {"tags"})
    @Query("SELECT p FROM Product p WHERE p.productId = :id")
    Optional<Product> findWithTagsById(UUID id);
}
