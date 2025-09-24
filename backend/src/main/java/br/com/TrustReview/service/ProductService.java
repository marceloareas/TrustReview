package br.com.TrustReview.service;

import br.com.TrustReview.dto.ProductRequestDTO;
import br.com.TrustReview.dto.ProductResponseDTO;
import br.com.TrustReview.exception.ProductNameAlreadyExists;
import br.com.TrustReview.exception.ProductNotFound;
import br.com.TrustReview.exception.TagNotFoundException;
import br.com.TrustReview.mapper.ProductMapper;
import br.com.TrustReview.mapper.TagMapper;
import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.Tag;
import br.com.TrustReview.repository.ProductRepository;
import br.com.TrustReview.repository.TagRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * Serviço responsável pela lógica de negócio relacionada à entidade {@link Product}.
 *
 * <p>
 * Esta classe centraliza as operações de criação, busca, atualização e remoção de produtos,
 * além de realizar validações e lançar exceções customizadas para cenários de erro.
 * </p>
 *
 * <ul>
 *   <li><b>create</b>: Cria um novo produto, garantindo unicidade pelo nome.</li>
 *   <li><b>getById</b>: Busca um produto pelo seu identificador único (UUID).</li>
 *   <li><b>update</b>: Atualiza os dados de um produto existente.</li>
 *   <li><b>delete</b>: Remove um produto do sistema.</li>
 *   <li><b>findByName</b>: Busca auxiliar por nome de produto.</li>
 *   <li><b>findById</b>: Busca auxiliar por ID de produto.</li>
 * </ul>
 *
 * <p>
 * Utiliza o {@link ProductMapper} para conversão entre entidades e DTOs, e o {@link ProductRepository}
 * para acesso ao banco de dados via Spring Data JPA.
 * </p>
 *
 * @author HernaniFilho
 */
@Slf4j
@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository repository;
    private final TagRepository tagRepository;
    private final ProductMapper productMapper;
    private final TagMapper tagMapper;

    /**
     * Cria um novo produto a partir dos dados informados.
     * Caso já exista um produto com o mesmo nome, lança exceção.
     *
     * @param request DTO contendo os dados do produto a ser criado
     * @return DTO de resposta com os dados do produto criado
     * @throws IllegalArgumentException se o nome do produto for nulo ou vazio
     * @throws ProductNameAlreadyExists se já existir produto com o mesmo nome
     */
    public ProductResponseDTO create(ProductRequestDTO request) {
        log.info("Criando um novo produto para name: {}", request.getName());

        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("O nome do produto não pode ser nulo ou vazio");
        }

        Optional<Product> existingProduct = findByName(request.getName());

        if (existingProduct.isPresent()) {
            log.error("Falha ao criar produto: nome já existe - {}", request.getName());
            throw new ProductNameAlreadyExists("Produto já existe para name: " + request.getName());
        }

        Product product = productMapper.toProduct(request);
        product.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        product.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        Product savedProduct = repository.save(product);
        log.info("Produto criado com sucesso para name: {}", savedProduct.getName());
        return productMapper.toResponse(savedProduct);
    }

    /**
     * Busca um produto pelo ID informado.
     *
     * @param id UUID do produto a ser buscado
     * @return DTO de resposta com os dados do produto encontrado
     * @throws ProductNotFound se o produto não for encontrado
     */
    public ProductResponseDTO getById(UUID id) {
        log.info("Buscando produto por id: {}", id);
        Optional<Product> existingProduct = findById(id);

        if (existingProduct.isEmpty()) {
            throw new ProductNotFound("Produto não encontrado para id: " + id);
        }

        log.info("Produto encontrado com sucesso para id: {}", id);
        return productMapper.toResponse(existingProduct.get());
    }

    /**
     * Atualiza os dados de um produto existente.
     *
     * @param productId UUID do produto a ser atualizado
     * @param request   DTO contendo os novos dados do produto
     * @return DTO de resposta com os dados do produto atualizado
     * @throws ProductNotFound se o produto não for encontrado
     */
    public ProductResponseDTO update(UUID productId, ProductRequestDTO request) {
        log.info("Atualizando produto para id: {}", productId);
        Optional<Product> existingProduct = findById(productId);

        if (existingProduct.isEmpty()) {
            throw new ProductNotFound("Produto não encontrado para id: " + productId);
        }
        Product productToUpdate = existingProduct.get();

        if (request.getName() != null || !request.getName().isBlank()) {
            Optional<Product> productWithSameName = findByName(request.getName());
            if (productWithSameName.isPresent() && !productWithSameName.get().getProductId().equals(productId)) {
                log.error("Falha ao atualizar produto: nome já existe - {}", request.getName());
                throw new ProductNameAlreadyExists("Produto já existe para name: " + request.getName());
            } else {
                log.info("Nome do produto atualizado para name: {}", request.getName());
                productToUpdate.setName(request.getName());
            }
        }

        if (request.getDescription() != null) {
            log.info("Descrição do produto atualizada para description: {}", request.getDescription());
            productToUpdate.setDescription(request.getDescription());
        }

        if (request.getOverallRating() != null) {
            log.info("Avaliação geral do produto atualizada para overallRating: {}", request.getOverallRating());
            productToUpdate.setOverallRating(request.getOverallRating());
        }

        // Lógica de validação de tags pode ser adicionada aqui
        if (request.getTags() != null && !request.getTags().isEmpty()) {
            Set<Tag> tags = request.getTags().stream()
                    .map(tagMapper::toTag)
                    .collect(java.util.stream.Collectors.toSet());

            // Lança exceção se alguma tag não existir
            log.info("Validando tags do produto");
            validateTags(tags);
            log.info("Tags do produto atualizadas");
            productToUpdate.setTags(tags);
        }

        productToUpdate.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        Product updatedProduct = repository.save(productToUpdate);
        log.info("Produto atualizado com sucesso para id: {}", productId);
        return productMapper.toResponse(updatedProduct);
    }

    /**
     * Remove um produto do sistema pelo seu ID.
     *
     * @param productId UUID do produto a ser removido
     * @throws ProductNotFound se o produto não for encontrado
     */
    public void delete(UUID productId) {
        log.info("Deletando produto para id: {}", productId);
        Optional<Product> existingProduct = findById(productId);

        if (existingProduct.isEmpty()) {
            throw new ProductNotFound("Produto não encontrado para id: " + productId);
        }

        repository.deleteById(productId);
        log.info("Produto deletado com sucesso para id: {}", productId);
    }

    /**
     * Busca auxiliar por produto a partir do nome.
     *
     * @param name Nome do produto a ser buscado
     * @return Optional contendo o produto encontrado ou vazio se não existir
     */
    @Transactional(readOnly = true)
    private Optional<Product> findByName(String name) {
        log.info("Buscando produto por name: {}", name);
        Optional<Product> product = repository.findByName(name);

        if (product.isEmpty()) {
            log.warn("Produto não encontrado para name: {}", name);
            return Optional.empty();
        }

        log.info("Produto encontrado para name: {}", name);
        return product;
    }

    /**
     * Busca auxiliar por produto a partir do ID.
     *
     * @param id UUID do produto a ser buscado
     * @return Optional contendo o produto encontrado ou vazio se não existir
     */
    @Transactional(readOnly = true)
    private Optional<Product> findById(UUID id) {
        log.info("Buscando produto por id: {}", id);
        Optional<Product> product = repository.findById(id);

        if (product.isEmpty()) {
            log.warn("Produto não encontrado para id: {}", id);
            return Optional.empty();
        }

        log.info("Produto encontrado para id: {}", id);
        return product;
    }

    /**
     * Valida se todas as tags informadas existem no sistema.
     *
     * @param tags Conjunto de tags a serem validadas
     * @return true se todas as tags forem válidas
     * @throws NullPointerException   se alguma tag tiver ID nulo
     * @throws TagNotFoundException   se alguma tag não for encontrada
     */
    @Transactional
    private void validateTags(Set<Tag> tags) {
        for (Tag tag : tags) {
            if (tag.getTagId() == null) {
                log.error("Tag inválida: ID nulo");
                throw new NullPointerException("Tag inválida: ID nulo");
            }
            boolean exists = tagRepository.existsById(tag.getTagId());
            if (!exists) {
                log.error("Tag não encontrada para id: {}", tag.getTagId());
                throw new TagNotFoundException("Tag não encontrada para id: " + tag.getTagId());
            }
        }
    }
}
