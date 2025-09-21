package br.com.TrustReview.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Entidade que representa uma tag no sistema.
 *
 * <p>
 * Esta classe mapeia a tabela <b>tags</b> no banco de dados e armazena informações sobre cada tag,
 * incluindo identificador, nome, descrição e os produtos associados a ela.
 * </p>
 *
 * <ul>
 *   <li><b>tagId</b>: Identificador único da tag (UUID).</li>
 *   <li><b>name</b>: Nome da tag (único e obrigatório).</li>
 *   <li><b>description</b>: Descrição da tag.</li>
 *   <li><b>products</b>: Conjunto de produtos associados a esta tag.</li>
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
@Table(name = Tag.TABLE_NAME)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Schema(description = "Entidade que representa uma tag")
public class Tag {
    public static final String TABLE_NAME = "tags";

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID tagId;

    @Column(name = "name", length = 100, nullable = false, unique = true)
    private String name;

    @Column(name = "description", length = 500)
    private String description;

    @ManyToMany(mappedBy = "tags")
    private Set<Product> products = new HashSet<>();
}
