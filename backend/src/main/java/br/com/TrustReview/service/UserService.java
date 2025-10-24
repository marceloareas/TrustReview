package br.com.TrustReview.service;

import br.com.TrustReview.dto.UserRequestDTO;
import br.com.TrustReview.dto.UserRequestLoginDTO;
import br.com.TrustReview.dto.UserResponseDTO;
import br.com.TrustReview.exception.InvalidCredentials;
import br.com.TrustReview.exception.UserEmailAlreadyExists;
import br.com.TrustReview.exception.UserNotFound;
import br.com.TrustReview.mapper.UserMapper;
import br.com.TrustReview.model.User;
import br.com.TrustReview.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * Serviço responsável pela lógica de negócio da entidade {@link User}.
 *
 * <p>
 * Realiza operações de criação, consulta, atualização parcial (patch), substituição (put),
 * remoção e autenticação de usuários. Valida regras básicas (null checks, unicidade de email),
 * aplica hashing de senha via {@link PasswordEncoder} e delega persistência ao {@link UserRepository}.
 * Converte entre entidades e DTOs utilizando {@link UserMapper}.
 * </p>
 *
 * Métodos principais:
 * <ul>
 *   <li>{@link #createUser(UserRequestDTO)} - cria um novo usuário garantindo unicidade de email;</li>
 *   <li>{@link #getUserById(UUID)} - busca usuário por ID;</li>
 *   <li>{@link #getUserByEmail(String)} - busca usuário por email;</li>
 *   <li>{@link #patchUserById(UUID, Map)} - atualiza parcialmente campos permitidos (name, email, password);</li>
 *   <li>{@link #putUserById(UUID, UserRequestDTO)} - substitui totalmente os dados do usuário;</li>
 *   <li>{@link #deleteUser(UUID)} - remove o usuário pelo ID;</li>
 *   <li>{@link #loginUser(UserRequestLoginDTO)} - autentica usuário comparando senha;</li>
 * </ul>
 *
 * Observações:
 * <ul>
 *   <li>Validações mais complexas e regras de negócio devem ser mantidas/expandidas aqui quando necessário.</li>
 *   <li>Exceções customizadas (ex: {@link UserEmailAlreadyExists}, {@link UserNotFound}, {@link InvalidCredentials})
 *       são lançadas para serem tratadas pelo manipulador global de exceções.</li>
 * </ul>
 *
 * @author HernaniFilho
 */
@Slf4j
@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * Cria um novo usuário.
     *
     * <p>Verifica campos obrigatórios, garante que o email não esteja em uso,
     * aplica hash na senha e persiste a entidade. Retorna o DTO de resposta do usuário criado.</p>
     *
     * @param userRequestDTO DTO contendo dados para criação do usuário
     * @return {@link UserResponseDTO} com os dados do usuário criado
     * @throws IllegalArgumentException se name, email ou password forem nulos
     * @throws UserEmailAlreadyExists se já existir usuário com o mesmo email
     */
    @Transactional
    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {

        if (userRequestDTO.getEmail() == null) {
            log.error("Email is null");
            throw new IllegalArgumentException("Email is null");
        }

        Optional<User> existingEmail = userRepository.findByEmail(userRequestDTO.getEmail());

        if (existingEmail.isPresent()) {
            log.error("User with email {} already exists", userRequestDTO.getEmail());
            throw new UserEmailAlreadyExists("Email de usuário já em uso");
        }

        if (userRequestDTO.getName() == null) {
            log.error("Name is null");
            throw new IllegalArgumentException("Name is null");
        }

        if (userRequestDTO.getPassword() == null) {
            log.error("Password is null");
            throw new IllegalArgumentException("Password is null");
        }

        User user = userMapper.toUserCreate(userRequestDTO);

        String EncryptedPassword = passwordEncoder.encode(userRequestDTO.getPassword());
        user.setPassword(EncryptedPassword);

        User persistedUser = userRepository.save(user);
        log.info("User created: {}", user);

        return userMapper.toUserResponseDTO(persistedUser);
    }

    /**
     * Recupera um usuário por seu identificador (UUID).
     *
     * @param id UUID do usuário
     * @return {@link UserResponseDTO} com os dados do usuário encontrado
     * @throws UserNotFound se nenhum usuário for encontrado para o ID informado
     */
    @Transactional
    public UserResponseDTO getUserById(UUID id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new UserNotFound("User with id " + id + " not found");
        }

        return userMapper.toUserResponseDTO(user.get());
    }

    /**
     * Recupera um usuário por email.
     *
     * @param email email do usuário
     * @return {@link UserResponseDTO} com os dados do usuário encontrado
     * @throws UserNotFound se nenhum usuário for encontrado para o email informado
     */
    @Transactional
    public UserResponseDTO getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new UserNotFound("User with email " + email + " not found");
        }

        return userMapper.toUserResponseDTO(user.get());
    }

    /**
     * Atualiza parcialmente um usuário (PATCH).
     *
     * <p>Aplica as alterações presentes no mapa {@code patchData} apenas para chaves
     * suportadas (name, email, password). Senha recebida é codificada antes de persistir.</p>
     *
     * @param id UUID do usuário a ser atualizado
     * @param patchData mapa com campos e valores a serem aplicados
     * @return {@link UserResponseDTO} com os dados atualizados
     * @throws UserNotFound se o usuário não for encontrado
     */
    @Transactional
    public UserResponseDTO patchUserById(UUID id, Map<String, Object> patchData) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User with id " + id + " not found"));

        patchData.forEach((key, value) -> {
            switch (key) {
                case "name" -> user.setName((String) value);
                case "email" -> user.setEmail((String) value);
                case "password" -> {
                    String EncryptedPassword = passwordEncoder.encode((String) value);
                    user.setPassword(EncryptedPassword);
                }
            }
        });

        userRepository.save(user);
        return userMapper.toUserResponseDTO(user);
    }

    /**
     * Substitui totalmente os dados de um usuário (PUT).
     *
     * <p>Valida campos obrigatórios, aplica hash na nova senha e persiste as alterações.</p>
     *
     * @param userId UUID do usuário a ser substituído
     * @param userRequestDTO DTO contendo o novo estado completo do usuário
     * @return {@link UserResponseDTO} com os dados atualizados
     * @throws UserNotFound se o usuário não for encontrado
     * @throws IllegalArgumentException se name, email ou password forem nulos
     */
    @Transactional
    public UserResponseDTO putUserById(UUID userId, UserRequestDTO userRequestDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound("User with id " + userId + " not found"));

        if (userRequestDTO.getName() == null) {
            log.error("Name is null");
            throw new IllegalArgumentException("Name is null");
        }

        if (userRequestDTO.getEmail() == null) {
            log.error("Email is null");
            throw new IllegalArgumentException("Email is null");
        }

        if  (userRequestDTO.getPassword() == null) {
            log.error("Password is null");
            throw new IllegalArgumentException("Password is null");
        }

        String EncryptedPassword = passwordEncoder.encode(userRequestDTO.getPassword());
        user.setPassword(EncryptedPassword);
        user.setEmail(userRequestDTO.getEmail());
        user.setName(userRequestDTO.getName());

        User persistedUser = userRepository.save(user);

        return userMapper.toUserResponseDTO(persistedUser);
    }

    /**
     * Remove um usuário do sistema pelo seu ID.
     *
     * @param id UUID do usuário a ser removido
     * @throws UserNotFound se o usuário não for encontrado
     */
    @Transactional
    public void deleteUser(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User with id " + id + " not found"));

        userRepository.delete(user);
    }

    /**
     * Autentica um usuário (login).
     *
     * <p>Recupera o usuário por email e compara a senha informada com o hash armazenado.
     * Em caso de sucesso retorna o {@link UserResponseDTO}.</p>
     *
     * @param userRequestLoginDTO DTO com credenciais de login (email, password)
     * @return {@link UserResponseDTO} do usuário autenticado
     * @throws UserNotFound se nenhum usuário existir para o email informado
     * @throws InvalidCredentials se a senha não corresponder
     */
    @Transactional
    public UserResponseDTO loginUser(UserRequestLoginDTO userRequestLoginDTO) {
        User user = userRepository.findByEmail(userRequestLoginDTO.getEmail())
                .orElseThrow(() -> new UserNotFound("User with email " + userRequestLoginDTO.getEmail() + " not found"));

        if (!passwordEncoder.matches(userRequestLoginDTO.getPassword(), user.getPassword())) {
            throw new InvalidCredentials("Invalid credentials, senha inválida");
        }

        return userMapper.toUserResponseDTO(user);
    }
}
