package br.com.TrustReview.mapper;

import br.com.TrustReview.dto.TagRequestDTO;
import br.com.TrustReview.dto.TagResponseDTO;
import br.com.TrustReview.model.Tag;
import org.springframework.stereotype.Component;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.extern.slf4j.Slf4j;

/**
 * Classe responsável por mapear objetos entre a entidade {@link Tag}
 * e seus respectivos DTOs de requisição e resposta.
 *
 * <p>
 * Centraliza a lógica de transformação entre entidades do domínio e objetos de transferência de dados (DTOs) de Tag,
 * facilitando a conversão de dados entre as camadas da aplicação.
 * </p>
 *
 * <ul>
 *   <li><b>toTag(TagRequestDTO)</b>: Converte um {@link TagRequestDTO} em uma entidade {@link Tag}.</li>
 *   <li><b>toTag(TagResponseDTO)</b>: Converte um {@link TagResponseDTO} em uma entidade {@link Tag}.</li>
 *   <li><b>toResponse(Tag)</b>: Converte uma entidade {@link Tag} em um {@link TagResponseDTO}.</li>
 *   <li><b>toResponse(TagRequestDTO)</b>: Converte um {@link TagRequestDTO} em um {@link TagResponseDTO}.</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@Slf4j
@Component
@Schema(description = "Classe de mapeamento entre entidades e DTOs de Tag")
public class TagMapper {

    /**
     * Converte um TagRequestDTO em uma entidade Tag.
     *
     * @param request DTO de requisição da tag
     * @return Entidade Tag preenchida
     */
    public Tag toTag(TagRequestDTO request) {
        Tag tag = new Tag();
        tag.setName(request.getName());
        tag.setDescription(request.getDescription());
        return tag;
    }

    /**
     * Converte um TagResponseDTO em uma entidade Tag.
     *
     * @param response DTO de resposta da tag
     * @return Entidade Tag preenchida
     */
    public Tag toTag(TagResponseDTO response) {
        Tag tag = new Tag();
        tag.setId(response.getId());
        tag.setName(response.getName());
        tag.setDescription(response.getDescription());
        return tag;
    }

    /**
     * Converte uma entidade Tag em um TagResponseDTO.
     *
     * @param tag Entidade Tag
     * @return DTO de resposta da tag
     */
    public TagResponseDTO toResponse(Tag tag) {
        TagResponseDTO response = new TagResponseDTO();
        response.setId(tag.getId());
        response.setName(tag.getName());
        response.setDescription(tag.getDescription());
        return response;
    }

    /**
     * Converte um TagRequestDTO em um TagResponseDTO.
     *
     * @param request DTO de requisição da tag
     * @return DTO de resposta da tag
     */
    public TagResponseDTO toResponse(TagRequestDTO request) {
        TagResponseDTO response = new TagResponseDTO();
        response.setName(request.getName());
        response.setDescription(request.getDescription());
        return response;
    }
}
