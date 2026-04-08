package br.com.TrustReview.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Representa uma avaliação (review) feita por um usuário sobre um produto.
 *
 * <p>
 * Cada registro nessa entidade está associado a um {@link User} e a um {@link Product},
 * compondo uma chave primária composta através da classe {@link ProductReviewId}.
 * </p>
 *
 * <p>
 * A entidade armazena informações como título, descrição, prós, contras,
 * nota (rating), curtidas, e datas de criação/atualização.
 * </p>
 *
 * <p>
 * O campo {@code pros} e {@code con} são armazenados como JSONB no banco
 * de dados, permitindo o registro estruturado de listas de pontos positivos
 * e negativos.
 * </p>
 *
 * <p>Usa:</p>
 * <ul>
 *   <li><b>Lombok</b> para geração de métodos utilitários;</li>
 *   <li><b>JPA</b> para mapeamento ORM;</li>
 *   <li><b>Swagger</b> para documentação automática na API;</li>
 *   <li><b>Jackson</b> para formatação JSON nas respostas.</li>
 * </ul>
 *
 * @author Jean
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = Review.TABLE_NAME)
@IdClass(ProductReviewId.class)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Schema(description = "Entidade que representa uma avaliação de um produto por um usuário.")
public class Review {

    public static final String TABLE_NAME = "reviews";

    /**
     * Usuário que realizou a avaliação.
     */
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @EqualsAndHashCode.Include
    @Schema(description = "Usuário que realizou a avaliação.")
    private User userId;

    /**
     * Produto que está sendo avaliado.
     */
    @Id
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @EqualsAndHashCode.Include
    @Schema(description = "Produto que está sendo avaliado.")
    private Product productId;

    /**
     * Título resumido da avaliação.
     */
    @Column(name = "title", length = 50, nullable = false, updatable = true)
    @Schema(description = "Título da avaliação.", example = "Excelente custo-benefício!")
    private String title;

    /**
     * Texto completo da avaliação feita pelo usuário.
     */
    @Column(name = "description", length = 1444, nullable = false, updatable = true)
    @Schema(description = "Descrição detalhada da avaliação.", example = "O produto superou minhas expectativas...")
    private String description;

    /**
     * Lista de aspectos positivos mencionados pelo usuário.
     * Armazenado como JSONB no banco.
     */
    @Type(JsonType.class)
    @Column(name = "pros", columnDefinition = "jsonb", nullable = false, updatable = true)
    @Schema(description = "Lista de aspectos positivos da experiência com o produto.", example = "[\"Qualidade excelente\", \"Design bonito\"]")
    private List<String> pros;

    /**
     * Lista de aspectos negativos mencionados pelo usuário.
     * Armazenado como JSONB no banco.
     */
    @Type(JsonType.class)
    @Column(name = "con", columnDefinition = "jsonb", nullable = false, updatable = true)
    @Schema(description = "Lista de aspectos negativos da experiência com o produto.", example = "[\"Preço elevado\", \"Bateria poderia durar mais\"]")
    private List<String> con;

    /**
     * Nota atribuída ao produto pelo usuário (0.0 a 5.0).
     */
    @Column(name = "rating", nullable = false, updatable = true)
    @Schema(description = "Nota atribuída ao produto (0.0 a 5.0).", example = "4.5")
    private Double rating;

    /**
     * Quantidade de curtidas recebidas na avaliação.
     */
    @Column(name = "likes", nullable = false, updatable = true)
    @Schema(description = "Quantidade de curtidas recebidas na avaliação.", example = "42")
    private Integer likes;

    /**
     * Quantidade de reações negativas (dislikes) recebidas.
     */
    @Column(name = "dislikes", nullable = false, updatable = true)
    @Schema(description = "Quantidade de reações negativas (dislikes) recebidas.", example = "3")
    private Integer dislikes;

    /**
     * Data e hora em que a avaliação foi criada.
     */
    @Column(name = "created_at", nullable = false, updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    @Schema(description = "Data e hora da criação da avaliação.", example = "2025-10-15T13:45:00.000Z")
    private Timestamp createdAt;

    /**
     * Data e hora da última atualização da avaliação.
     */
    @Column(name = "updated_at", nullable = false, updatable = true)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    @Schema(description = "Data e hora da última atualização da avaliação.", example = "2025-10-15T15:12:30.000Z")
    private Timestamp updatedAt;

    @Schema(description = "Indica se a análise de sentimento foi realizada.")
    private boolean analyzed;

    @Schema(description = "Sentimento geral da avaliação após análise.")
    private boolean contradictory;

    @Schema(description = "Pontuação de confiança da análise de sentimento.")  
    private double confidenceScore;
}
