package br.com.TrustReview.service;

import br.com.TrustReview.dto.TagRequestDTO;
import br.com.TrustReview.dto.TagResponseDTO;
import br.com.TrustReview.exception.TagNameAlreadyExists;
import br.com.TrustReview.mapper.ProductMapper;
import br.com.TrustReview.mapper.TagMapper;
import br.com.TrustReview.model.Tag;
import br.com.TrustReview.repository.ProductRepository;
import br.com.TrustReview.repository.TagRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final ProductRepository productRepository;
    private final TagMapper tagMapper;
    private final ProductMapper productMapper;

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

}
