package br.com.TrustReview.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

/**
 * Classe de configuração responsável por habilitar e definir
 * a execução de métodos assíncronos na aplicação.
 *
 * <p>
 * Esta configuração utiliza o mecanismo de processamento assíncrono
 * do Spring (@EnableAsync), permitindo que métodos anotados com
 * {@code @Async} sejam executados em threads separadas, melhorando
 * desempenho e escalabilidade em tarefas que não precisam bloquear
 * o fluxo principal.
 * </p>
 *
 * <p>
 * O executor definido nesta classe é especialmente configurado para
 * operações relacionadas à análise de sentimento, garantindo controle
 * sobre o número de threads, fila de execução e identificação das threads.
 * </p>
 *
 * <ul>
 *   <li><b>corePoolSize</b>: Quantidade mínima de threads mantidas ativas (2).</li>
 *   <li><b>maxPoolSize</b>: Quantidade máxima de threads permitidas (4).</li>
 *   <li><b>queueCapacity</b>: Capacidade da fila de tarefas pendentes (50).</li>
 *   <li><b>threadNamePrefix</b>: Prefixo para identificação das threads criadas.</li>
 * </ul>
 *
 * <p>
 * O bean pode ser referenciado explicitamente em métodos anotados com
 * {@code @Async("sentimentAsyncExecutor")}.
 * </p>
 *
 * @author Jean
 */
@Configuration
@EnableAsync
public class AsyncConfig {

    /**
     * Executor assíncrono dedicado para processamento de análise de sentimento.
     *
     * <p>
     * Este executor utiliza {@link ThreadPoolTaskExecutor} para gerenciar
     * a execução concorrente de tarefas, permitindo melhor controle
     * de recursos e identificação das threads no log da aplicação.
     * </p>
     *
     * @return executor configurado para tarefas assíncronas de sentimento
     */
    @Bean(name = "sentimentAsyncExecutor")
    public Executor sentimentAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(4);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("Sentiment-Async-");
        executor.initialize();
        return executor;
    }
}
