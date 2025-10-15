package br.com.TrustReview.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Entidade que representa um produto no sistema.
 *
 * <p>
 * Esta classe mapeia a tabela <b>products</b> no banco de dados e armazena informações detalhadas
 * sobre cada produto, incluindo identificador, nome, descrição, avaliação geral, tags associadas
 * e timestamps de criação e atualização.
 * </p>
 *
 * <ul>
 *   <li><b>productId</b>: Identificador único do produto (UUID).</li>
 *   <li><b>name</b>: Nome do produto (único e obrigatório).</li>
 *   <li><b>description</b>: Descrição detalhada do produto.</li>
 *   <li><b>tags</b>: Conjunto de tags associadas ao produto.</li>
 *   <li><b>overallRating</b>: Avaliação geral do produto.</li>
 *   <li><b>createdAt</b>: Data/hora de criação do produto.</li>
 *   <li><b>updatedAt</b>: Data/hora da última atualização do produto.</li>
 * </ul>
 *
 * <p>
 * Utiliza anotações do JPA para mapeamento ORM, Lombok para geração de métodos utilitários
 * e Swagger para documentação automática.
 * </p>
 *
 * @author HernaniFilho
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = Product.TABLE_NAME)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Schema(description = "Entidade que representa um produto")
public class Product {
    public static final String TABLE_NAME = "products";

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", length = 255, nullable = false, unique = true)
    private String name;

    @Column(name = "description", length = 1000, nullable = true, updatable = true)
    private String description;

    @ManyToMany
    @JoinTable(
        name = "products_tags",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @JsonManagedReference
    private Set<Tag> tags = new HashSet<>();

    @Column(name = "overall_rating", nullable = true, updatable = true)
    private Double overallRating;

    @Column(name = "created_at", nullable = false, updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    private Timestamp createdAt;

    @Column(name = "updated_at", nullable = false, updatable = true)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    private Timestamp updatedAt;
}
