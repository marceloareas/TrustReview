package br.com.TrustReview.exception;

/**
 * Exceção lançada quando já existe um produto cadastrado com o mesmo nome.
 *
 * <p>
 * Esta exceção é utilizada para sinalizar que uma tentativa de cadastro ou atualização
 * de produto falhou devido à duplicidade do nome informado.
 * </p>
 *
 * @author HernaniFilho
 */
public class ProductNameAlreadyExists extends RuntimeException {
    public ProductNameAlreadyExists(String message) {
        super(message);
    }
}
