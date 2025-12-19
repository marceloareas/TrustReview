package br.com.TrustReview.service;

import br.com.TrustReview.dto.SentimentAnalysisRequestDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

/**
 * Cliente responsável por realizar a comunicação com o serviço externo
 * de análise de sentimento.
 *
 * <p>
 * Esta classe encapsula a lógica de integração HTTP com o serviço de
 * análise de sentimento, utilizando {@link WebClient} do Spring WebFlux
 * para envio de requisições reativas e não bloqueantes.
 * </p>
 *
 * <p>
 * A URL base do serviço é configurada via propriedade
 * {@code sentiment.service.url}, permitindo flexibilidade entre
 * ambientes (desenvolvimento, homologação e produção).
 * </p>
 *
 * <p>
 * O cliente envia um {@link SentimentAnalysisRequestDTO} para o endpoint
 * de análise e recebe como resposta um mapa genérico contendo os dados
 * processados pelo serviço externo.
 * </p>
 *
 * <p>
 * Utiliza SLF4J para logging e é gerenciado pelo Spring como um componente.
 * </p>
 *
 * @author Jean
 */
@Slf4j
@Component
public class SentimentAnalysisClient {

    /**
     * Cliente Web reativo utilizado para comunicação HTTP com o serviço
     * de análise de sentimento.
     */
    private final WebClient webClient;

    /**
     * Construtor responsável por inicializar o {@link WebClient} com a
     * URL base do serviço de análise de sentimento.
     *
     * <p>
     * A URL é injetada via {@code application.yml} ou {@code application.properties}.
     * Caso a propriedade não esteja definida ou esteja vazia, a aplicação
     * lança uma exceção durante a inicialização.
     * </p>
     *
     * @param baseUrl URL base do serviço de análise de sentimento
     */
    public SentimentAnalysisClient(
            @Value("${sentiment.service.url}") String baseUrl
    ) {
        log.info(">>> BASE URL RECEBIDA = [{}]", baseUrl);

        if (baseUrl == null || baseUrl.isBlank()) {
            throw new IllegalStateException(
                "sentiment.service.url NÃO FOI DEFINIDA"
            );
        }

        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    /**
     * Envia uma requisição para o serviço de análise de sentimento.
     *
     * <p>
     * O método realiza uma chamada HTTP POST para o endpoint {@code /analyze},
     * enviando os dados da avaliação encapsulados em
     * {@link SentimentAnalysisRequestDTO}.
     * </p>
     *
     * <p>
     * A resposta é tratada de forma reativa e retornada como um
     * {@link Mono} contendo um {@link Map} genérico com os dados retornados
     * pelo serviço externo.
     * </p>
     *
     * @param request dados da avaliação a serem analisados
     * @return {@link Mono} contendo o resultado da análise de sentimento
     */
    @SuppressWarnings("unchecked")
    public Mono<Map<String, Object>> analyze(SentimentAnalysisRequestDTO request) {

        log.info("🌐 Enviando request para serviço de análise de sentimento");

        return webClient.post()
                .uri("/analyze")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> (Map<String, Object>) response);
    }
}
