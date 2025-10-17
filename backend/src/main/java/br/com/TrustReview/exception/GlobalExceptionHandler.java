package br.com.TrustReview.exception;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Manipulador global de exceções para a API.
 *
 * <p>
 * Esta classe captura e trata exceções lançadas durante o processamento das requisições,
 * retornando respostas padronizadas com informações detalhadas sobre o erro ocorrido.
 * </p>
 *
 * <ul>
 *   <li>Trata exceções genéricas, erros de leitura do corpo da requisição, argumentos inválidos,
 *       métodos HTTP não suportados, falhas de validação e exceções customizadas do domínio.</li>
 *   <li>Retorna sempre um objeto {@link ApiError} com detalhes do erro para o front-end.</li>
 *   <li>Utiliza anotações do Swagger para documentação automática.</li>
 * </ul>
 *
 * <p>
 * Exemplos de erros tratados:
 * <ul>
 *   <li><b>Exception</b>: Erros inesperados do servidor (500).</li>
 *   <li><b>HttpMessageNotReadableException</b>: Corpo da requisição ausente ou inválido (400).</li>
 *   <li><b>IllegalArgumentException</b>: Argumentos inválidos fornecidos (400).</li>
 *   <li><b>HttpRequestMethodNotSupportedException</b>: Método HTTP não permitido (405).</li>
 *   <li><b>MethodArgumentNotValidException</b>: Falhas de validação em campos (400).</li>
 *   <li><b>ProductNotFound</b>: Produto não encontrado (404).</li>
 *   <li><b>TagNotFoundException</b>: Tag não encontrada (404).</li>
 *   <li><b>ProductNameAlreadyExists</b>: Nome de produto já cadastrado (400).</li>
 *   <li><b>TagNameAlreadyExists</b>: Nome de tag já cadastrado (400).</li>
 * </ul>
 * </p>
 *
 * @author HernaniFilho
 */
@ControllerAdvice
@Schema(description = "Manipulador global de exceções para a API")
public class GlobalExceptionHandler {

    /**
     * Trata exceção quando um produto não é encontrado.
     *
     * @param ex Exceção lançada
     * @return ResponseEntity com detalhes do erro de produto não encontrado
     */
    @ExceptionHandler(ProductNotFound.class)
    public ResponseEntity<ApiError> handleProductNotFound(ProductNotFound ex) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                "PRODUCT_NOT_FOUND", 
                null
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    /**
     * Trata exceção quando uma tag não é encontrada.
     *
     * @param ex Exceção lançada
     * @return ResponseEntity com detalhes do erro de tag não encontrada
     */
    @ExceptionHandler(TagNotFound.class)
    public ResponseEntity<ApiError> handleTagNotFound(TagNotFound ex) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                "TAG_NOT_FOUND",
                null
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    /**
     * Trata exceção quando já existe um produto com o mesmo nome.
     *
     * @param ex Exceção lançada
     * @return ResponseEntity com detalhes do erro de nome de produto duplicado
     */
    @ExceptionHandler(ProductNameAlreadyExists.class)
    public ResponseEntity<ApiError> handleProductNameAlreadyExists(ProductNameAlreadyExists ex) {
        ApiError error = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage(),
                "PRODUCT_NAME_ALREADY_EXISTS",
                null
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    /**
     * Trata exceção quando já existe uma tag com o mesmo nome.
     *
     * @param ex Exceção lançada
     * @return ResponseEntity com detalhes do erro de nome de tag duplicado
     */
    @ExceptionHandler(TagNameAlreadyExists.class)
    public ResponseEntity<ApiError> handleTagNameAlreadyExists(TagNameAlreadyExists ex) {
        ApiError error = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage(),
                "TAG_NAME_ALREADY_EXISTS",
                null
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }




    /**
     * Trata exceções genéricas não capturadas por outros handlers.
     *
     * @param ex Exceção lançada
     * @return ResponseEntity com detalhes do erro interno
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneric(Exception ex) {
        ex.printStackTrace();

        ApiError error = new ApiError(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
            "Erro inesperado no servidor",
            "INTERNAL_ERROR",
            List.of(ex.getMessage())
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    /**
     * Trata erros de leitura do corpo da requisição (ex: JSON malformado ou ausente).
     *
     * @param ex Exceção lançada
     * @return ResponseEntity com detalhes do erro de requisição
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        ApiError error = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                "O corpo da requisição não pode estar vazio.",
                "BAD_REQUEST",
                List.of(ex.getMessage())
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    /**
     * Trata argumentos inválidos fornecidos em requisições.
     *
     * @param ex Exceção lançada
     * @return ResponseEntity com detalhes do erro de argumento
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalArgumentException(IllegalArgumentException ex) {
        ApiError error = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                "BAD_REQUEST",
                List.of(ex.getMessage())
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    /**
     * Trata métodos HTTP não suportados pela rota.
     *
     * @param ex Exceção lançada
     * @return ResponseEntity com detalhes do erro de método não permitido
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiError> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        ApiError error = new ApiError(
                HttpStatus.METHOD_NOT_ALLOWED.value(),
                HttpStatus.METHOD_NOT_ALLOWED.getReasonPhrase(),
                "Método HTTP não permitido",
                "METHOD_NOT_ALLOWED",
                List.of(ex.getMessage())
        );
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(error);
    }

    /**
     * Trata falhas de validação em campos de entrada.
     *
     * @param ex Exceção lançada
     * @return ResponseEntity com detalhes dos erros de validação
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex) {
        List<String> details = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(err -> {
                    if (err instanceof FieldError fieldError) {
                        return fieldError.getField() + ": " + fieldError.getDefaultMessage();
                    } else {
                        return err.getDefaultMessage();
                    }
                })
                .toList();

        ApiError error = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Erro de validação nos campos",
                "VALIDATION_FAILED",
                details
        );

        return ResponseEntity.badRequest().body(error);
    }

    /**
     * Trata exceção quando já existe um usuário com o mesmo e-mail.
     *
     * @param ex Exceção lançada
     * @return ResponseEntity com detalhes do erro de e-mail de usuário duplicado
     */
    @ExceptionHandler(UserEmailAlredyExits.class)
    public ResponseEntity<ApiError> handleUserEmailAlreadyExists(UserEmailAlredyExits ex) {
        ApiError error = new ApiError(
                HttpStatus.CONFLICT.value(),                     
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),                                 
                "USER_EMAIL_ALREADY_EXISTS",          
                List.of(ex.getMessage())                      
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }



}
