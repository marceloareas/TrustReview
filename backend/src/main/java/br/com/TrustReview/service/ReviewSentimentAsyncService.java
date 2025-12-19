package br.com.TrustReview.service;

import br.com.TrustReview.dto.SentimentAnalysisRequestDTO;
import br.com.TrustReview.model.Review;
import br.com.TrustReview.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Serviço responsável por executar a análise de sentimento de avaliações
 * de forma assíncrona.
 *
 * <p>
 * Esta classe desacopla o processamento de análise de sentimento do fluxo
 * principal da aplicação, permitindo que a persistência da avaliação não
 * seja bloqueada enquanto a análise é realizada por um serviço externo.
 * </p>
 *
 * <p>
 * O processamento é executado em uma thread separada utilizando o executor
 * configurado em {@code AsyncConfig}, identificado pelo nome
 * {@code sentimentAsyncExecutor}.
 * </p>
 *
 * <p>
 * O serviço realiza as seguintes etapas:
 * </p>
 *
 * <ul>
 *   <li>Constrói um {@link SentimentAnalysisRequestDTO} a partir da entidade {@link Review}.</li>
 *   <li>Dispara a análise de sentimento de forma assíncrona.</li>
 *   <li>Processa a resposta retornada pelo serviço de análise.</li>
 *   <li>Atualiza a avaliação com indicadores de contradição e confiança.</li>
 *   <li>Persiste as alterações no banco de dados.</li>
 * </ul>
 *
 * <p>
 * Utiliza {@code @Async} para execução concorrente, Lombok para injeção
 * de dependências e SLF4J para registro de logs.
 * </p>
 *
 * @author Jean
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewSentimentAsyncService {

    /**
     * Cliente responsável por se comunicar com o serviço de análise de sentimento.
     */
    private final SentimentAnalysisClient client;

    /**
     * Repositório responsável pela persistência da entidade {@link Review}.
     */
    private final ReviewRepository reviewRepository;

    /**
     * Executa a análise de sentimento de uma avaliação de forma assíncrona.
     *
     * <p>
     * O método dispara uma requisição para o serviço de análise de sentimento
     * e, ao receber a resposta, verifica a existência de contradições entre
     * o texto da avaliação e a nota atribuída, além de registrar o nível
     * de confiança da análise.
     * </p>
     *
     * <p>
     * Em caso de sucesso, a avaliação é marcada como analisada e atualizada
     * no banco de dados. Em caso de erro, o evento é registrado em log.
     * </p>
     *
     * @param review entidade de avaliação que será analisada
     */
    @Async("sentimentAsyncExecutor")
    public void analyzeReviewAsync(Review review) {

        log.info(
            "🔥 DISPARANDO análise de sentimento (ASYNC) para review userId={}, productId={}",
            review.getUserId().getId(),
            review.getProductId().getId()
        );

        SentimentAnalysisRequestDTO request =
            new SentimentAnalysisRequestDTO(
                review.getUserId().getId(),
                review.getProductId().getId(),
                review.getDescription(),
                review.getRating()
            );

        client.analyze(request)
            .subscribe(response -> {

                Map<String, Object> consistency =
                    (Map<String, Object>) response.get("consistency");

                if (consistency != null) {

                    Object contradiction = consistency.get("contradiction");
                    Object confidence = consistency.get("confidence");

                    review.setAnalyzed(true);
                    review.setContradictory(Boolean.TRUE.equals(contradiction));

                    if (confidence instanceof Number number) {
                        review.setConfidenceScore(number.doubleValue());
                    }

                    reviewRepository.save(review);

                    log.info("✅ Análise de sentimento concluída para a review.");
                } else {
                    log.warn("⚠️ Resposta sem bloco 'consistency'");
                }

            }, error -> {
                log.error("❌ Erro ao analisar sentimento da review.", error);
            });
    }
}
