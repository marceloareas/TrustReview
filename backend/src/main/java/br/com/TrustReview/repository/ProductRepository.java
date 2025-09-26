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
 * incluindo operações CRUD padrão e consultas customizadas
 * </p>
 *
 * <ul>
 *   <li><b>findByName</b>: Busca um produto pelo nome.</li>
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
}
