package br.com.TrustReview.model;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.util.List;
import java.io.Serializable;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Classe auxiliar que representa a chave composta da entidade {@link Review}.
 *
 * <p>
 * Essa chave é formada pela combinação dos identificadores de um {@link Product}
 * e de um {@link User}, garantindo que um mesmo usuário só possa avaliar
 * um produto uma única vez.
 * </p>
 *
 * <p>
 * Essa classe é usada em conjunto com a anotação {@code @IdClass(ProductReviewId.class)}
 * na entidade {@link Review}.
 * </p>
 *
 * <p><b>Implementa:</b> {@link Serializable}</p>
 *
 * @author Jean
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ProductReviewId implements Serializable {

    /**
     * Identificador do produto avaliado.
     */
    @Schema(description = "Identificador único do produto avaliado.")
    private UUID productId;

    /**
     * Identificador do usuário que realizou a avaliação.
     */
    @Schema(description = "Identificador único do usuário que realizou a avaliação.")
    private UUID userId;
}
