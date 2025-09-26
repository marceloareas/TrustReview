package br.com.TrustReview.mapper;

import br.com.TrustReview.dto.ProductRequestDTO;
import br.com.TrustReview.dto.ProductResponseDTO;
import br.com.TrustReview.dto.TagResponseDTO;
import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.Tag;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.extern.slf4j.Slf4j;

import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Component;

/**
 * Classe responsável por mapear objetos entre as entidades {@link Product} e {@link Tag}
 * e seus respectivos DTOs de requisição e resposta.
 *
 * <p>
 * Centraliza a lógica de transformação entre entidades do domínio e objetos de transferência de dados (DTOs),
 * facilitando a conversão de dados entre as camadas da aplicação.
 * </p>
 *
 * <ul>
 *   <li><b>toProduct(ProductRequestDTO)</b>: Converte um {@link ProductRequestDTO} em uma entidade {@link Product}.</li>
 *   <li><b>toProduct(ProductResponseDTO)</b>: Converte um {@link ProductResponseDTO} em uma entidade {@link Product}.</li>
 *   <li><b>toResponse(Product)</b>: Converte uma entidade {@link Product} em um {@link ProductResponseDTO}.</li>
 *   <li><b>toResponse(ProductRequestDTO)</b>: Converte um {@link ProductRequestDTO} em um {@link ProductResponseDTO}.</li>
 * </ul>
 *
 * <p>
 * Utiliza o {@link TagMapper} para conversão entre entidades e DTOs de tags associadas ao produto.
 * </p>
 *
 * @author HernaniFilho
 */
@Slf4j
@Component
@Schema(description = "Classe de mapeamento entre entidades e DTOs de Produto")
public class ProductMapper {

    private final TagMapper tagMapper;

    public ProductMapper(){
        this.tagMapper = new TagMapper();
    }

    /**
     * Converte um ProductRequestDTO em uma entidade Product.
     *
     * @param request DTO de requisição do produto
     * @return Entidade Product preenchida
     */
    public Product toProduct(ProductRequestDTO request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setOverallRating(request.getOverallRating());

        if (request.getTags() != null) {
            Set<Tag> tags = request.getTags().stream()
                                .map(tagMapper::toTag)
                                .collect(Collectors.toSet());
            product.getTags().addAll(tags);
        } else {
            product.setTags(Set.of());
        }

        product.setCreatedAt(request.getCreatedAt());
        product.setUpdatedAt(request.getUpdatedAt());

        return product;
    }

    /**
     * Converte um ProductResponseDTO em uma entidade Product.
     *
     * @param response DTO de resposta do produto
     * @return Entidade Product preenchida
     */
    public Product toProduct(ProductResponseDTO response) {
        Product product = new Product();
        product.setId(response.getProductId());
        product.setName(response.getName());
        product.setDescription(response.getDescription());
        product.setOverallRating(response.getOverallRating());

        if (response.getTags() != null) {
            Set<Tag> tags = response.getTags()
                .stream()
                .map(tagMapper::toTag)
                .collect(Collectors.toSet());
            product.getTags().addAll(tags);
        } else {
            product.setTags(Set.of());
        }

        product.setCreatedAt(response.getCreatedAt());
        product.setUpdatedAt(response.getUpdatedAt());

        return product;
    }

    /**
     * Converte uma entidade Product em um ProductResponseDTO.
     *
     * @param product Entidade Product
     * @return DTO de resposta do produto
     */
    public ProductResponseDTO toResponse(Product product) {
        ProductResponseDTO response = new ProductResponseDTO();
        response.setProductId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setOverallRating(product.getOverallRating());

        if (product.getTags() != null && Hibernate.isInitialized(product.getTags())) {
            Set<TagResponseDTO> tagDTOs = product.getTags()
                .stream()
                .map(tagMapper::toResponse)
                .collect(Collectors.toSet());
            response.setTags(tagDTOs);

        } else {
            response.setTags(Set.of());
        }

        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());
        return response;
    }

    /**
     * Converte um ProductRequestDTO em um ProductResponseDTO.
     *
     * @param request DTO de requisição do produto
     * @return DTO de resposta do produto
     */
    public ProductResponseDTO toResponse(ProductRequestDTO request) {
        ProductResponseDTO response = new ProductResponseDTO();
        response.setName(request.getName());
        response.setDescription(request.getDescription());
        response.setOverallRating(request.getOverallRating());
        response.setTags(request.getTags());
        response.setCreatedAt(request.getCreatedAt());
        response.setUpdatedAt(request.getUpdatedAt());
        return response;
    }
}
