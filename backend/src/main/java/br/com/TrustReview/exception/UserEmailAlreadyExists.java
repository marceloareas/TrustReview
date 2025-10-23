package br.com.TrustReview.exception;

/**
 * Exceção lançada quando já existe um usuário cadastrado com o e-mail informado.
 *
 * <p>Trata-se de uma RuntimeException (unchecked) usada pela camada de serviço para sinalizar
 * conflito de unicidade de e-mail. A mensagem passada ao construtor deve descrever o conflito
 * (por exemplo: "Email already in use: user@example.com").</p>
 *
 * Uso típico:
 * <pre>
 * if (userRepository.findByEmail(email).isPresent()) {
 *     throw new UserEmailAlreadyExists("Email already in use: " + email);
 * }
 * </pre>
 *
 * Observação: o mapeamento para HTTP (409 Conflict) é feito pelo {@link GlobalExceptionHandler}.
 *
 * @author HernaniFilho
 */
public class UserEmailAlreadyExists extends RuntimeException {
    public UserEmailAlreadyExists(String message) {
        super(message);
    }
}
