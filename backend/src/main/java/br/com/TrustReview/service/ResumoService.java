package br.com.TrustReview.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class ResumoService {

    @Value("${groq.api.key}")
    private String apiKey;

    private static final String GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

    private final RestTemplate restTemplate = new RestTemplate();

    public String summarizeReviews(String productName, String description, List<String> pros, List<String> cons) {
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
        List<Map> choices = (List<Map>) response.getBody().get("choices");
        Map message = (Map) choices.get(0).get("message");
        return (String) message.get("content");
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
