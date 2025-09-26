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
 * Repositório para operações de acesso a dados da entidade {@link Tag}.
 *
 * <p>
 * Esta interface fornece métodos para manipulação de tags no banco de dados,
 * incluindo operações CRUD padrão e consultas customizadas.
 * </p>
 *
 * <ul>
 *   <li><b>findByName</b>: Busca uma tag pelo nome.</li>
 *   <li><b>findAllByProductId</b>: Busca todas as tags associadas a um determinado produto pelo seu ID.</li>
 * </ul>
 *
 * <p>
 * Utiliza Spring Data JPA para geração automática das implementações e otimização de queries.
 * </p>
 *
 * @author HernaniFilho
 */
@Repository
public interface TagRepository extends JpaRepository<Tag, UUID> {

    /**
     * Busca uma tag pelo nome.
     *
     * @param name Nome da tag
     * @return Optional contendo a tag, se encontrado, se não, vazio
     */
    Optional<Tag> findByName(String name);

    /**
     * Busca todas as tags associadas a um produto específico.
     *
     * @param productId UUID do produto cujas tags devem ser retornadas
     * @return Lista de tags associadas ao produto
     */
    List<Tag> findTagsByProductsId(UUID productId);
}
