package br.com.TrustReview.mapper;

import br.com.TrustReview.dto.UserRequestDTO;
import br.com.TrustReview.dto.UserResponseDTO;
import br.com.TrustReview.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Schema
/**
 * Mapper responsável por converter entre a entidade {@link br.com.TrustReview.model.User}
 * e os DTOs {@link br.com.TrustReview.dto.UserRequestDTO} / {@link br.com.TrustReview.dto.UserResponseDTO}.
 *
 * <p>
 * Centraliza conversões simples para manter controladores e serviços mais limpos:
 * - evita exposição de senha (define senha como string vazia nos DTOs/entidade quando aplicável);
 * - aplica o tipo de usuário padrão {@link br.com.TrustReview.model.User.UserTypeEnum#STANDARD}
 *   para prevenir criação de administradores via mapeamento automático.
 * </p>
 *
 * Métodos:
 * <ul>
 *   <li>toUser(UserRequestDTO) - converte request DTO para entidade (uso geral)</li>
 *   <li>toUserCreate(UserRequestDTO) - conversão específica para criação (mesmo comportamento atual)</li>
 *   <li>toUserResponseDTO(User) - converte entidade para response DTO (oculta senha)</li>
 *   <li>toUserResponseDTO(UserRequestDTO) - converte request DTO em response DTO (sem id)</li>
 * </ul>
 *
 * Observações:
 * <ul>
 *   <li>Regras de persistência (criptografia de senha, validações complexas) devem ser executadas no serviço.</li>
 *   <li>Alterar o comportamento de definição de userType aqui pode impactar regras de negócio; revisar com cautela.</li>
 * </ul>
 * @author HernaniFilho
 */
public class UserMapper {
    /**
     * Converte um {@link UserRequestDTO} em {@link User}.
     *
     * @param requestDTO DTO de requisição com os dados do usuário
     * @return entidade User com os campos copiados do DTO. A senha é definida como string vazia
     *         e o userType como {@link User.UserTypeEnum#STANDARD}.
     */
    public User toUser(UserRequestDTO requestDTO) {
        User user = new User();
        user.setName(requestDTO.getName());
        user.setEmail(requestDTO.getEmail());
        user.setPassword("");
        user.setUserType(User.UserTypeEnum.STANDARD);        //Evita forçar admins no banco
        return user;
    }

    /**
     * Converte um {@link UserRequestDTO} em {@link User} usado especificamente durante a criação.
     *
     * <p>Atualmente possui o mesmo comportamento de {@link #toUser(UserRequestDTO)}, mas está
     * separado para manter intenção explícita e permitir futuras diferenças de comportamento.</p>
     *
     * @param requestDTO DTO de requisição com os dados do usuário
     * @return entidade User pronta para persistência (senha vazia, userType STANDARD)
     */
    public User toUserCreate(UserRequestDTO requestDTO) {
        User user = new User();
        user.setName(requestDTO.getName());
        user.setEmail(requestDTO.getEmail());
        user.setPassword("");
        user.setUserType(User.UserTypeEnum.STANDARD);        //Evita forçar admins no banco
        return user;
    }

    /**
     * Converte uma entidade {@link User} em {@link UserResponseDTO}.
     *
     * @param user entidade User (normalmente carregada do repositório)
     * @return DTO de resposta com os campos públicos do usuário; a senha no DTO será uma string vazia.
     */
    public UserResponseDTO toUserResponseDTO(User user) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setId(user.getId());
        userResponseDTO.setName(user.getName());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setPassword("");
        userResponseDTO.setUserType(user.getUserType());
        return userResponseDTO;
    }

    /**
     * Converte um {@link UserRequestDTO} em {@link UserResponseDTO}.
     *
     * <p>Útil quando se deseja transformar um request em uma representação de resposta
     * sem persistir a entidade (por exemplo, em fluxos de validação ou preview).</p>
     *
     * @param userRequestDTO DTO de requisição
     * @return DTO de resposta derivado do request (sem id). O userType será {@link User.UserTypeEnum#STANDARD}.
     */
    public UserResponseDTO toUserResponseDTO(UserRequestDTO  userRequestDTO) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setName(userRequestDTO.getName());
        userResponseDTO.setEmail(userRequestDTO.getEmail());
        userResponseDTO.setPassword("");
        userResponseDTO.setUserType(User.UserTypeEnum.STANDARD);     // Pode dar problemas em outras regras de negócio
        return userResponseDTO;
    }
}
