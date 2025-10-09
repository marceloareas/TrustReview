package br.com.TrustReview.repository;

import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Interface de repositório para operações de persistência da entidade {@link Tag}.
 *
 * <p>
 * Fornece métodos para manipulação de tags no banco de dados,
 * incluindo consultas customizadas e operações CRUD padrão.
 * Utiliza Spring Data JPA para geração automática das implementações.
 * </p>
 *
 * <ul>
 *   <li><b>findByName</b>: Retorna uma tag pelo nome.</li>
 *   <li><b>findAllWithProducts</b>: Retorna todas as tags com seus produtos associados.</li>
 *   <li><b>findTagsByProductsId</b>: Retorna todas as tags associadas a um produto específico.</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@Repository
public interface TagRepository extends JpaRepository<Tag, UUID> {

    /**
     * Retorna uma tag pelo nome informado.
     *
     * @param name Nome da tag
     * @return Optional contendo a tag, se encontrada
     */
    Optional<Tag> findByName(String name);

    /**
     * Retorna todas as tags com seus produtos associados.
     *
     * @return Lista de tags com produtos
     */
    @Query("SELECT DISTINCT t FROM Tag t LEFT JOIN FETCH t.products")
    List<Tag> findAllWithProducts();

    /**
     * Retorna todas as tags associadas a um produto específico.
     *
     * @param productId UUID do produto
     * @return Lista de tags associadas ao produto informado
     */
    List<Tag> findTagsByProductsId(UUID productId);
}