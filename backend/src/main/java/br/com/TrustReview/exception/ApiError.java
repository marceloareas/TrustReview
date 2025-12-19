package br.com.TrustReview.exception;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

/**
 * Classe que representa o modelo de erro retornado pela API em respostas de exceção.
 * 
 * <p>
 * Esta classe encapsula informações detalhadas sobre erros ocorridos durante o processamento
 * de requisições, facilitando o tratamento e exibição de mensagens amigáveis no front-end.
 * </p>
 * 
 * <ul>
 *   <li><b>status</b>: Código HTTP do erro (ex: 404, 500).</li>
 *   <li><b>error</b>: Descrição resumida do erro (ex: "Not Found").</li>
 *   <li><b>message</b>: Mensagem detalhada sobre o erro ocorrido.</li>
 *   <li><b>errorCode</b>: Código específico para identificação do erro no front-end.</li>
 *   <li><b>details</b>: Lista de detalhes adicionais sobre o erro (ex: validações).</li>
 *   <li><b>timestamp</b>: Data e hora em que o erro ocorreu.</li>
 * </ul>
 * 
 * <p>
 * Utiliza anotações do Swagger para documentação automática e do Jackson para formatação do timestamp.
 * </p>
 * 
 * @author HernaniFilho
 */
@Getter
@Schema(description = "Detalhes do erro retornado pela API")
public class ApiError {
        @Schema(description = "Código HTTP do erro", example = "404")
    private final int status;

    @Schema(description = "Descrição do erro", example = "Not Found")
    private final String error;

    @Schema(description = "Mensagem detalhada do erro", example = "Product não encontrado com id: 99")
    private final String message;

    @Schema(description = "Código do erro para front-end", example = "PRODUCT_NOT_FOUND")
    private final String errorCode;

    @Schema(description = "Detalhes adicionais do erro")
    private final List<String> details;

    @Schema(description = "Timestamp do erro")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss.SSS")
    private final String timestamp;

    public ApiError(int status, String error, String message, String errorCode, List<String> details) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.errorCode = errorCode;
        this.details = details;
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss.SSS"));

    }

}
