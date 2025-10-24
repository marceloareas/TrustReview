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
 * Centraliza o tratamento de exceções lançadas durante o processamento das requisições HTTP
 * e traduz essas exceções para respostas HTTP padronizadas contendo um payload {@link ApiError}.
 * Este componente garante consistência nas mensagens de erro retornadas ao cliente e mapeia
 * exceções específicas para códigos HTTP apropriados.
 * </p>
 *
 * Exceções tratadas (exemplos):
 * <ul>
 *   <li>ProductNotFound, TagNotFound          - 404 Not Found</li>
 *   <li>ProductNameAlreadyExists, TagNameAlreadyExists - 400 Bad Request</li>
 *   <li>UserEmailAlreadyExists                 - 409 Conflict</li>
 *   <li>MethodArgumentNotValidException        - 400 Bad Request (validação de campos)</li>
 *   <li>HttpMessageNotReadableException        - 400 Bad Request (corpo inválido)</li>
 *   <li>HttpRequestMethodNotSupportedException - 405 Method Not Allowed</li>
 *   <li>Exception (genérico)                   - 500 Internal Server Error</li>
 * </ul>
 *
 * <p>
 * Observação: a lógica de construção do objeto {@link ApiError} é centralizada aqui; regras de negócio
 * e decisões de transação continuam na camada de serviço.
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
     * @param ex exceção lançada que indica que o produto solicitado não existe
     * @return ResponseEntity contendo {@link ApiError} com status 404 Not Found
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
     * @param ex exceção lançada que indica que a tag solicitada não existe
     * @return ResponseEntity contendo {@link ApiError} com status 404 Not Found
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
     * @param ex exceção lançada indicando conflito no nome do produto
     * @return ResponseEntity contendo {@link ApiError} com status 400 Bad Request
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
     * @param ex exceção lançada indicando conflito no nome da tag
     * @return ResponseEntity contendo {@link ApiError} com status 400 Bad Request
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
     * <p>Registra stack trace e retorna uma resposta 500 com informação genérica de erro.</p>
     *
     * @param ex exceção não tratada explicitamente
     * @return ResponseEntity contendo {@link ApiError} com status 500 Internal Server Error
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
     * @param ex exceção indicando falha ao desserializar o corpo da requisição
     * @return ResponseEntity contendo {@link ApiError} com status 400 Bad Request
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
     * Trata argumentos inválidos fornecidos em requisições (validações do Spring/Bean Validation).
     *
     * @param ex exceção que contém os erros de validação de campos
     * @return ResponseEntity contendo {@link ApiError} com status 400 Bad Request e lista de detalhes
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
     * @param ex exceção indicando método HTTP não permitido
     * @return ResponseEntity contendo {@link ApiError} com status 405 Method Not Allowed
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
     * Trata falhas de validação em campos de entrada (MethodArgumentNotValidException).
     *
     * <p>Extrai mensagens de campo e constrói uma lista de detalhes no {@link ApiError}.</p>
     *
     * @param ex exceção contendo os erros de binding/validação
     * @return ResponseEntity contendo {@link ApiError} com status 400 Bad Request e detalhes por campo
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
     * @param ex exceção indicando que o e-mail informado já está em uso
     * @return ResponseEntity contendo {@link ApiError} com status 409 Conflict
     */
    @ExceptionHandler(UserEmailAlreadyExists.class)
    public ResponseEntity<ApiError> handleUserEmailAlreadyExists(UserEmailAlreadyExists ex) {
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
