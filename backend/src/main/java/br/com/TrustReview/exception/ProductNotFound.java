package br.com.TrustReview.exception;

/**
 * Exceção lançada quando um produto não é encontrado no sistema.
 *
 * <p>
 * Esta exceção é utilizada para sinalizar que uma operação de busca por produto
 * não encontrou nenhum registro correspondente ao critério informado.
 * </p>
 *
 * @author HernaniFilho
 */
public class ProductNotFound extends RuntimeException {
    public ProductNotFound(String message) {
        super(message);
    }
}
