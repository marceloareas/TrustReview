package br.com.TrustReview.repository;

import br.com.TrustReview.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositório JPA para a entidade {@link br.com.TrustReview.model.User}.
 *
 * <p>
 * Define consultas específicas relacionadas a {@code User} além dos métodos
 * herdados de {@link JpaRepository}. Apenas os métodos declarados explicitamente
 * nesta interface estão documentados; métodos padrão do JpaRepository não são descritos aqui.
 * </p>
 *
 * Observações:
 * <ul>
 *   <li>Regras de negócio (validações, unicidade, criptografia de senha, transações) devem ser tratadas
 *       na camada de serviço.</li>
 *   <li>O método {@code findByEmail} é utilizado para localizar usuários por email (autenticação/validação).</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    /**
     * Busca um usuário pelo seu email.
     *
     * <p>Este método é declarado aqui para consultas específicas por email. Retorna um
     * {@link Optional} contendo a entidade {@link User} caso exista uma correspondência,
     * ou {@code Optional.empty()} caso contrário.</p>
     *
     * Observação: não documenta métodos herdados de {@link JpaRepository}.
     *
     * @param email email a ser pesquisado
     * @return Optional contendo o {@link User} caso exista, ou vazio caso contrário
     */
    Optional<User> findByEmail(String email);
}
