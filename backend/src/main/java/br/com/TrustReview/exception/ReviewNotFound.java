package br.com.TrustReview.exception;

/**
 * Exceção lançada quando uma review não é encontrado no sistema.
 *
 * <p>
 * Esta exceção é utilizada para sinalizar que uma operação de busca por uma review
 * não encontrou nenhum registro correspondente ao critério informado.
 * </p>
 *
 * @author Jean
 */
public class ReviewNotFound extends RuntimeException {
    public ReviewNotFound(String message) {
        super(message);
    }
}
