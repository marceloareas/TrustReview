package br.com.TrustReview.service;

import br.com.TrustReview.dto.ProductPageDTO;
import br.com.TrustReview.dto.ProductRequestDTO;
import br.com.TrustReview.dto.ProductResponseDTO;
import br.com.TrustReview.exception.ProductNameAlreadyExists;
import br.com.TrustReview.exception.ProductNotFound;
import br.com.TrustReview.exception.TagNotFound;
import br.com.TrustReview.mapper.ProductMapper;
import br.com.TrustReview.mapper.TagMapper;
import br.com.TrustReview.model.Product;
import br.com.TrustReview.model.Tag;
import br.com.TrustReview.repository.ProductRepository;
import br.com.TrustReview.repository.TagRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Serviço responsável pela lógica de negócio da entidade {@link Product}.
 *
 * <p>
 * Realiza operações de criação, consulta, atualização e remoção de produtos,
 * garantindo validações de unicidade, existência e integridade dos dados.
 * Lança exceções customizadas para cenários de erro e utiliza mapeadores para conversão entre entidades e DTOs.
 * </p>
 *
 * <ul>
 *   <li><b>create</b>: Cria um novo produto, validando unicidade do nome e existência das tags.</li>
 *   <li><b>getById</b>: Busca produto por ID, podendo incluir relacionamentos.</li>
 *   <li><b>getAll</b>: Lista todos os produtos, com opção de incluir tags.</li>
 *   <li><b>findRelatedProducts</b>: Busca produtos relacionados por tags compartilhadas.</li>
 *   <li><b>update</b>: Atualiza dados de um produto existente, validando nome e tags.</li>
 *   <li><b>delete</b>: Remove produto pelo ID.</li>
 * </ul>
 *
 * <p>
 * Utiliza {@link ProductRepository} e {@link TagRepository} para acesso aos dados,
 * {@link ProductMapper} e {@link TagMapper} para conversão de objetos.
 * </p>
 *
 * @author HernaniFilho
 */
@Slf4j
@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final TagRepository tagRepository;
    private final ProductMapper productMapper;
    private final TagMapper tagMapper;

    /**
     * Cria um novo produto a partir dos dados informados.
     * Garante que não exista outro produto com o mesmo nome.
     *
     * @param request DTO contendo os dados do produto a ser criado
     * @return DTO de resposta com os dados do produto criado
     * @throws IllegalArgumentException se o nome do produto for nulo ou vazio
     * @throws ProductNameAlreadyExists se já existir produto com o mesmo nome
     */
    @Transactional
    public ProductResponseDTO create(ProductRequestDTO request) {
        log.info("Criando um novo produto para name: {}", request.getName());

        if (request.getName() == null || request.getName().isBlank()) {
            log.error("O nome do produto não pode ser nulo ou vazio");
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

        if (request.getTags() != null && !request.getTags().isEmpty()) {
            Set<Tag> managedTags = validateTags(
                request.getTags().stream()
                    .map(tagMapper::toTag) 
                    .collect(Collectors.toSet())
            );
            product.setTags(managedTags);
        }

        Product savedProduct = productRepository.save(product);
        log.info("Produto criado com sucesso para name: {}", savedProduct.getName());
        return productMapper.toResponse(savedProduct);
    }

    /**
     * Busca um produto pelo ID informado.
     *
     * @param id UUID do produto a ser buscado
     * @param include Lista de relacionamentos a incluir (ex: "tags")
     * @return DTO de resposta com os dados do produto encontrado
     * @throws ProductNotFound se o produto não for encontrado
     */
    @Transactional(readOnly = true)
    public ProductResponseDTO getById(UUID id, List<String> include) {
        Optional<Product> existingProduct = findById(id);

        if (existingProduct.isEmpty()) {
            throw new ProductNotFound("Produto não encontrado para id: " + id);
        }

        //TODO: Melhorar logica
        if (include != null) {
            for (String inc : include) {
                switch (inc) {
                    case "tags":
                        //TODO: Pode virar uma outra função pública separada no futuro
                        log.info("Buscando Tags associadas ao produto: {}", id);
                        existingProduct.get().setTags(
                                new HashSet<>(tagRepository.findTagsByProductsId(id))
                        );
                        log.info("Tags carregadas para produto: {}", id);
                        break;
//                    case "reviews":
//                        log.info("Buscando Reviews associadas ao produto: {}", id);
//                        existingProduct.get().setReviews(
//                                new HashSet<>(reviewRepository.findAllByProductId(id))
//                        );
//                        break;
                    default:
                        log.warn("Campo {} para incluir inválido", inc);
                        break;
                }
            }
        }

        return productMapper.toResponse(existingProduct.get());
    }

    /**
     * Busca todos os produtos cadastrados no sistema.
     * Permite opcionalmente incluir as tags associadas a cada produto.
     *
     * @return Lista de DTO com todos os produtos
     * @throws ProductNotFound se não encontrar nenhum produto
     */
    public List<ProductResponseDTO> getAll(boolean includeTags) {
        List<Product> all = null;
        if (includeTags) {
            log.info("Buscando todos os produtos com tags.");
            all = productRepository.findAllWithTags();

        } else {
            log.info("Buscando todos os produtos.");
            all = productRepository.findAll();
        }


        if (all.isEmpty()) {
            log.error("Nenhum produto encontrado!");
            throw new ProductNotFound("Nenhum produto encontrado!");
        }
        return all.stream()
                .map(productMapper::toResponse)
                .toList();
    }

    /**
     * Busca produtos relacionados com base nas tags compartilhadas.
     * Retorna uma página de produtos que compartilham tags com o produto especificado.
     *
     * @param productId UUID do produto base para encontrar relacionados
     * @param page Número da página a ser retornada (0-indexed)
     * @param size Tamanho da página (número máximo de produtos por página)
     * @return Página de produtos relacionados
     * @throws ProductNotFound se o produto base não for encontrado
     */
    @Transactional(readOnly = true)
    public ProductPageDTO getRelatedProducts(UUID productId, int page, int size) {
        log.info("Buscando produtos relacionados para id: {}", productId);
        Optional<Product> existingProduct = findById(productId);

        if (existingProduct.isEmpty()) {
            throw new ProductNotFound("Produto não encontrado para id: " + productId);
        }

        var pageable = PageRequest.of(page, size);
        Page<Product> relatedProducts = productRepository.findRelatedProducts(productId, pageable);
        return new ProductPageDTO(
                relatedProducts.getContent(),
                relatedProducts.getNumber(),
                relatedProducts.getSize(),
                relatedProducts.getTotalElements(),
                relatedProducts.getTotalPages(),
                relatedProducts.isLast()
        );
    }
    
    /**
     * Atualiza os dados de um produto existente.
     * Valida unicidade do nome e existência das tags informadas.
     *
     * @param productId UUID do produto a ser atualizado
     * @param request   DTO contendo os novos dados do produto
     * @return DTO de resposta com os dados do produto atualizado
     * @throws ProductNotFound se o produto não for encontrado
     * @throws ProductNameAlreadyExists se já existir produto com o mesmo nome
     * @throws TagNotFound se alguma tag informada não existir
     */
    @Transactional
    public ProductResponseDTO update(UUID productId, ProductRequestDTO request) {
        log.info("Atualizando produto para id: {}", productId);
        Optional<Product> existingProduct = findById(productId);

        if (existingProduct.isEmpty()) {
            throw new ProductNotFound("Produto não encontrado para id: " + productId);
        }
        Product productToUpdate = existingProduct.get();

        if (request.getName() != null || !request.getName().isBlank()) {
            Optional<Product> productWithSameName = findByName(request.getName());
            if (productWithSameName.isPresent() && !productWithSameName.get().getId().equals(productId)) {
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

        // Validação e atualização das tags associadas ao produto
        if (request.getTags() != null && !request.getTags().isEmpty()) {
            Set<Tag> tags = request.getTags().stream()
                    .map(tagMapper::toTag)
                    .collect(Collectors.toSet());

            log.info("Validando tags do produto");
            tags = validateTags(tags);
            log.info("Tags do produto atualizadas");
            productToUpdate.setTags(tags);
        }

        productToUpdate.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        Product updatedProduct = productRepository.save(productToUpdate);
        log.info("Produto atualizado com sucesso para id: {}", productId);
        return productMapper.toResponse(updatedProduct);
    }

    /**
     * Remove um produto do sistema pelo seu ID.
     *
     * @param productId UUID do produto a ser removido
     * @throws ProductNotFound se o produto não for encontrado
     */
    @Transactional
    public void delete(UUID productId) {
        log.info("Deletando produto para id: {}", productId);
        Optional<Product> existingProduct = findById(productId);

        if (existingProduct.isEmpty()) {
            throw new ProductNotFound("Produto não encontrado para id: " + productId);
        }

        productRepository.deleteById(productId);
        log.info("Produto deletado com sucesso para id: {}", productId);
    }

    /**
     * Busca auxiliar por produto a partir do nome.
     *
     * @param name Nome do produto a ser buscado
     * @return Optional contendo o produto encontrado ou vazio se não existir
     */
    private Optional<Product> findByName(String name) {
        log.info("Buscando produto por name: {}", name);
        Optional<Product> product = productRepository.findByName(name);

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
    private Optional<Product> findById(UUID id) {
        log.info("Buscando produto por id: {}", id);
        Optional<Product> product = productRepository.findById(id);

        if (product.isEmpty()) {
            log.warn("Produto não encontrado para id: {}", id);
            return Optional.empty();
        }

        log.info("Produto encontrado para id: {}", id);
        return product;
    }

    /**
     * Valida se todas as tags informadas existem no sistema.
     * Lança exceção se alguma tag não for encontrada ou tiver ID nulo.
     *
     * @param tags Conjunto de tags a serem validadas
     * @return Conjunto de tags válidas encontradas no banco
     * @throws IllegalArgumentException se alguma tag tiver ID nulo
     * @throws TagNotFound se alguma tag não for encontrada
     */
    private Set<Tag> validateTags(Set<Tag> tags) {
        Set<UUID> tagIds = tags.stream()
                .map(tag -> {
                    if (tag.getId() == null) {
                        log.error("Tag sem ID ou ID null não é permitida");
                        throw new IllegalArgumentException("Tag sem ID ou ID null não é permitida");
                    }
                    return tag.getId();
                })
                .collect(Collectors.toSet());

        Set<Tag> foundTags = new HashSet<>(tagRepository.findAllById(tagIds));

        if (tagIds.size() != foundTags.size()) {
            log.error("Alguma tag não foi encontrada");
            throw new TagNotFound("Alguma tag não foi encontrada!");
        }
        return foundTags;
    }
}
