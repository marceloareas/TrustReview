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
        if (!StringUtils.hasText(apiKey)) {
            log.warn("GROQ_API_KEY não configurada; resumo não será gerado (produto={})", productName);
            return null;
        }

        String prompt = buildPrompt(productName, description, pros, cons);

        Map<String, Object> body = Map.of(
            "model", "llama-3.3-70b-versatile",
            "messages", List.of(
                Map.of("role", "user", "content", prompt)
            )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey); // ✅ autenticação do Groq

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(GROQ_URL, request, Map.class);

        // Formato de resposta OpenAI/Groq
        Map responseBody = response.getBody();
        if (responseBody == null) {
            log.warn("Resposta vazia do Groq ao gerar resumo (produto={})", productName);
            return null;
        }

        Object choicesObj = responseBody.get("choices");
        if (!(choicesObj instanceof List<?> choices) || choices.isEmpty()) {
            log.warn("Resposta inesperada do Groq (choices ausente/vazio) ao gerar resumo (produto={})", productName);
            return null;
        }

        Object firstChoice = choices.get(0);
        if (!(firstChoice instanceof Map<?, ?> firstChoiceMap)) {
            log.warn("Resposta inesperada do Groq (choice não é objeto) ao gerar resumo (produto={})", productName);
            return null;
        }

        Object messageObj = firstChoiceMap.get("message");
        if (!(messageObj instanceof Map<?, ?> messageMap)) {
            log.warn("Resposta inesperada do Groq (message ausente) ao gerar resumo (produto={})", productName);
            return null;
        }

        Object contentObj = messageMap.get("content");
        if (!(contentObj instanceof String content) || !StringUtils.hasText(content)) {
            log.warn("Resposta inesperada do Groq (content vazio) ao gerar resumo (produto={})", productName);
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
}
