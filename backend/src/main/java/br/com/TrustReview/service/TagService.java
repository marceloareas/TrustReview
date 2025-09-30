package br.com.TrustReview.service;

import br.com.TrustReview.dto.TagRequestDTO;
import br.com.TrustReview.dto.TagResponseDTO;
import br.com.TrustReview.exception.TagNameAlreadyExists;
import br.com.TrustReview.exception.TagNotFound;
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

import java.util.Optional;
import java.util.UUID;

/**
 * Serviço responsável pela lógica de negócio relacionada à entidade {@link Tag}.
 *
 * <p>
 * Centraliza as operações de criação, busca, atualização e remoção de tags,
 * realizando validações de unicidade, existência e integridade de dados,
 * além de lançar exceções customizadas para cenários de erro.
 * </p>
 *
 * <ul>
 *   <li><b>create</b>: Cria uma nova tag, garantindo unicidade pelo nome.</li>
 *   <li><b>getById</b>: Busca uma tag pelo seu identificador único (UUID).</li>
 *   <li><b>update</b>: Atualiza os dados de uma tag existente, validando nome.</li>
 *   <li><b>delete</b>: Remove uma tag do sistema.</li>
 *   <li><b>findByName</b>: Busca auxiliar por nome de tag.</li>
 *   <li><b>findById</b>: Busca auxiliar por ID de tag.</li>
 * </ul>
 *
 * <p>
 * Utiliza o {@link TagMapper} para conversão entre entidades e DTOs,
 * {@link TagRepository} para acesso a dados de tags.
 * </p>
 *
 * @author HernaniFilho
 */
@Slf4j
@Service
@AllArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    /**
     * Cria uma nova tag a partir dos dados informados.
     * Garante que não exista outra tag com o mesmo nome.
     *
     * @param request DTO contendo os dados da tag a ser criada
     * @return DTO de resposta com os dados da tag criada
     * @throws IllegalArgumentException se o nome da tag for nulo ou vazio
     * @throws TagNameAlreadyExists se já existir tag com o mesmo nome
     */
    @Transactional
    public TagResponseDTO create(TagRequestDTO request) {
        log.info("Criando uma nova tag para name: {}", request.getName());

        if (request.getName() == null || request.getName().isBlank()) {
            log.error("O nome da tag não pode ser nulo ou vazio");
            throw new IllegalArgumentException("O nome da tag não pode ser nulo ou vazio");
        }

        Optional<Tag> existingTag = findByName(request.getName());

        if (existingTag.isPresent()) {
            log.error("Falha ao criar a tag: nome já existe - {}", request.getName());
            throw new TagNameAlreadyExists("Tag já existe para name: " + request.getName());
        }

        Tag tag = tagMapper.toTag(request);
        Tag savedTag = tagRepository.save(tag);
        log.info("Tag criado com sucesso para name: {}", savedTag.getName());
        return tagMapper.toResponse(savedTag);
    }

    /**
     * Busca uma tag pelo ID informado.
     *
     * @param id UUID da tag a ser buscada
     * @return DTO de resposta com os dados da tag encontrada
     * @throws TagNotFound se a tag não for encontrada
     */
    @Transactional(readOnly = true)
    public TagResponseDTO getById(UUID id) {
        Optional<Tag> existingTag= findById(id);

        if (existingTag.isEmpty()) {
            throw new TagNotFound("Tag não encontrado para id: " + id);
        }

        return tagMapper.toResponse(existingTag.get());
    }

    /**
     * Atualiza os dados de uma tag existente
     *
     * @param tagId UUID da tag a ser atualizadoa
     * @param request   DTO contendo os novos dados da tag
     * @return DTO de resposta com os dados da tag atualizado
     * @throws TagNotFound se a tag não for encontrada
     * @throws TagNameAlreadyExists se já existir produto com o mesmo nome
     */
    @Transactional
    public TagResponseDTO update(UUID tagId, TagRequestDTO request) {
        log.info("Atualizando tag para id: {}", tagId);
        Optional<Tag> existingTag = findById(tagId);

        if (existingTag.isEmpty()) {
            throw new TagNotFound("Tag não encontrada para id: " + tagId);
        }
        Tag tagToUpdate = existingTag.get();

        if (request.getName() != null || !request.getName().isBlank()) {
            Optional<Tag> tagWithSameName = findByName(request.getName());
            if (tagWithSameName.isPresent() && !tagWithSameName.get().getId().equals(tagId)) {
                log.error("Falha ao atualizar tag: nome já existe - {}", request.getName());
                throw new TagNameAlreadyExists("Tag já existe para name: " + request.getName());
            } else {
                log.info("Nome da tag atualizado para name: {}", request.getName());
                tagToUpdate.setName(request.getName());
            }
        }

        if (request.getDescription() != null) {
            log.info("Descrição da tag atualizada para description: {}", request.getDescription());
            tagToUpdate.setDescription(request.getDescription());
        }

        Tag updatedProduct = tagRepository.save(tagToUpdate);
        log.info("Tag atualizada com sucesso para id: {}", tagId);
        return tagMapper.toResponse(updatedProduct);
    }

    /**
     * Remove uma tag do sistema pelo seu ID.
     *
     * @param tagId UUID da tag a ser removida
     * @throws TagNotFound se a tag não for encontrada
     */
    @Transactional
    public void delete(UUID tagId) {
        log.info("Deletando produto para id: {}", tagId);
        Optional<Tag> existingTag = findById(tagId);

        if (existingTag.isEmpty()) {
            throw new TagNotFound("Tag não encontrada para id: " + tagId);
        }

        tagRepository.deleteById(tagId);
        log.info("Tag deletada com sucesso para id: {}", tagId);
    }

    /**
     * Busca auxiliar por tag a partir do nome.
     *
     * @param name Nome da tag a ser buscada
     * @return Optional contendo a tag encontrada ou vazio se não existir
     */
    private Optional<Tag> findByName(String name) {
        log.info("Buscando tag por name: {}", name);
        Optional<Tag> tag = tagRepository.findByName(name);

        if (tag.isEmpty()) {
            log.warn("Tag não encontrada para name: {}", name);
            return Optional.empty();
        }

        log.info("Tag encontrada para name: {}", name);
        return tag;
    }

    /**
     * Busca auxiliar por tag a partir do ID.
     *
     * @param id UUID da tag a ser buscada
     * @return Optional contendo a tag encontrado ou vazio se não existir
     */
    private Optional<Tag> findById(UUID id) {
        log.info("Buscando tag por id: {}", id);
        Optional<Tag> tag = tagRepository.findById(id);

        if (tag.isEmpty()) {
            log.warn("Tag não encontrada para id: {}", id);
            return Optional.empty();
        }

        log.info("Tag encontrada para id: {}", id);
        return tag;
    }
}
