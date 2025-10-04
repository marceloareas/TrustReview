package br.com.TrustReview.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * DTO de resposta para informações detalhadas de um produto.
 *
 * <p>
 * Esta classe é utilizada para transferir dados do produto entre as camadas da aplicação,
 * especialmente nas respostas das APIs. Inclui informações como identificador, nome,
 * descrição, avaliação geral e timestamps de criação e atualização.
 * </p>
 *
 * <ul>
 *   <li><b>productId</b>: Identificador único do produto (UUID).</li>
 *   <li><b>name</b>: Nome do produto.</li>
 *   <li><b>description</b>: Descrição detalhada do produto.</li>
 *   <li><b>overallRating</b>: Avaliação geral do produto.</li>
 *   <li><b>createdAt</b>: Data/hora de criação do produto.</li>
 *   <li><b>updatedAt</b>: Data/hora da última atualização do produto.</li>
 * </ul>
 *
 * <p>
 * Utiliza anotações do Swagger para documentação automática e Lombok para geração de métodos utilitários.
 * </p>
 *
 * @author HernaniFilho
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de resposta para informações do produto")
public class ProductResponseDTO {

    @Schema(description = "ID do produto", example = "3fa85f64-5717-4562-b3fc-2c963f66afa6" )
    private UUID id;

    @Schema(description = "Nome do produto", example = "Notebook Dell XPS 13")
    private String name;

    @Schema(description = "Descrição do produto", example = "Um notebook potente e leve da Dell")
    private String description;

    @Schema(description = "Tags associadas ao produto")
    private Set<TagResponseDTO> tags;

    @Schema(description = "Avaliação geral do produto", example = "4.5")
    private Double overallRating;

    @Schema(description = "Timestamp de criação do produto", example = "2023-10-01T12:00:00Z")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    private Timestamp createdAt;

    @Schema(description = "Timestamp da última atualização do produto", example = "2023-10-10T15:30:00Z")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    private Timestamp updatedAt;
}
