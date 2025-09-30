package br.com.TrustReview.exception;

/**
 * Exceção lançada quando uma tag não é encontrada no sistema.
 *
 * <p>
 * Esta exceção é utilizada para sinalizar que uma operação de busca por tag
 * não encontrou nenhum registro correspondente ao critério informado.
 * </p>
 *
 * @author HernaniFilho
 */
public class TagNotFound extends RuntimeException {
    public TagNotFound(String message) {
        super(message);
    }
}
