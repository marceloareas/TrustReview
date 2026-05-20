package br.com.TrustReview.service;

import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
@Slf4j
public class ResumoService {

    @Value("${groq.api.key}")
    private String apiKey;

    private static final String GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

    private final RestTemplate restTemplate = new RestTemplate();

    public String summarizeReviews(String productName, String description, List<String> pros, List<String> cons) {
        return callGroq(buildPrompt(productName, description, pros, cons), productName);
    }

    public String summarizeAspects(String productName, String aspectLabel, List<String> aspects) {
        if (aspects == null || aspects.isEmpty()) {
            return null;
        }
        return callGroq(buildAspectPrompt(productName, aspectLabel, aspects), productName);
    }

    private String callGroq(String prompt, String context) {
        if (!StringUtils.hasText(apiKey)) {
            log.warn("GROQ_API_KEY não configurada; resumo não será gerado (contexto={})", context);
            return null;
        }

        Map<String, Object> body = Map.of(
            "model", "llama-3.3-70b-versatile",
            "messages", List.of(
                Map.of("role", "user", "content", prompt)
            )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(GROQ_URL, request, Map.class);

        Map responseBody = response.getBody();
        if (responseBody == null) {
            log.warn("Resposta vazia do Groq ao gerar resumo (contexto={})", context);
            return null;
        }

        Object choicesObj = responseBody.get("choices");
        if (!(choicesObj instanceof List<?> choices) || choices.isEmpty()) {
            log.warn("Resposta inesperada do Groq (choices ausente/vazio) ao gerar resumo (contexto={})", context);
            return null;
        }

        Object firstChoice = choices.get(0);
        if (!(firstChoice instanceof Map<?, ?> firstChoiceMap)) {
            log.warn("Resposta inesperada do Groq (choice não é objeto) ao gerar resumo (contexto={})", context);
            return null;
        }

        Object messageObj = firstChoiceMap.get("message");
        if (!(messageObj instanceof Map<?, ?> messageMap)) {
            log.warn("Resposta inesperada do Groq (message ausente) ao gerar resumo (contexto={})", context);
            return null;
        }

        Object contentObj = messageMap.get("content");
        if (!(contentObj instanceof String content) || !StringUtils.hasText(content)) {
            log.warn("Resposta inesperada do Groq (content vazio) ao gerar resumo (contexto={})", context);
            return null;
        }

        return content;
    }

    private String buildPrompt(String productName, String description, List<String> pros, List<String> cons) {
        return String.format("""
            Você é um assistente especializado em análise de produtos.
            Com base nas informações abaixo, escreva um resumo objetivo e útil sobre o produto.

            Produto: %s
            Descrição: %s
            Pontos fortes: %s
            Pontos fracos: %s

            Escreva um parágrafo resumindo a experiência geral dos usuários com esse produto.
            """,
            productName,
            description,
            String.join(", ", pros),
            String.join(", ", cons)
        );
    }

    private String buildAspectPrompt(String productName, String aspectLabel, List<String> aspects) {
        return String.format("""
            Você é um assistente especializado em análise de produtos.
            Abaixo está uma lista de %s mencionados pelos usuários nas avaliações do produto "%s".

            %s: %s

            Escreva um único parágrafo curto e objetivo resumindo esses %s.
            Agrupe pontos semelhantes e não invente informações que não estejam na lista.
            """,
            aspectLabel,
            productName,
            aspectLabel,
            String.join(", ", aspects),
            aspectLabel
        );
    }
}
