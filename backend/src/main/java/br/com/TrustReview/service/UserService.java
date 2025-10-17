package br.com.TrustReview.service;

import br.com.TrustReview.dto.UserRequestDTO;
import br.com.TrustReview.dto.UserResponseDTO;
import br.com.TrustReview.exception.UserEmailAlredyExits;
import br.com.TrustReview.exception.UserNotFound;
import br.com.TrustReview.mapper.UserMapper;
import br.com.TrustReview.model.User;
import br.com.TrustReview.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {

        if (userRequestDTO.getEmail() == null) {
            log.error("Email is null");
            throw new IllegalArgumentException("Email is null");
        }


        Optional<User> existingEmail = userRepository.findByEmail(userRequestDTO.getEmail());

        if (existingEmail.isPresent()) {
            log.error("User with email {} already exists", userRequestDTO.getEmail());
            throw new UserEmailAlredyExits("Email de usuário já em uso");
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

        String EncryptedPassword = BCrypt.hashpw(userRequestDTO.getPassword(), BCrypt.gensalt());
        user.setPassword(EncryptedPassword);

        User persistedUser = userRepository.save(user);
        persistedUser.setPassword("");
        log.info("User created: {}", user);

        return userMapper.toUserResponseDTO(persistedUser);
    }

    //public UserResponseDTO updateUser(UserRequestDTO userRequestDTO) {}
    @Transactional
    public UserResponseDTO getUserById(UUID id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new UserNotFound("User with id " + id + " not found");
        }

        return userMapper.toUserResponseDTO(user.get());
    }

    @Transactional
    public UserResponseDTO getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new UserNotFound("User with email " + email + " not found");
        }

        return userMapper.toUserResponseDTO(user.get());
    }

    @Transactional
    public UserResponseDTO patchUserById(UUID id, Map<String, Object> patchData) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User with id " + id + " not found"));

        patchData.forEach((key, value) -> {
            switch (key) {
                case "name" -> user.setName((String) value);
                case "email" ->user.setEmail((String) value);
                case "password" -> {
                    String EncryptedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
                    user.setPassword(EncryptedPassword);
                }
            }
        });

        userRepository.save(user);
        return userMapper.toUserResponseDTO(user);
    }

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

        String EncryptedPassword = BCrypt.hashpw(userRequestDTO.getPassword(), BCrypt.gensalt());
        user.setPassword(EncryptedPassword);
        user.setEmail(userRequestDTO.getEmail());
        user.setName(userRequestDTO.getName());

        User persistedUser = userRepository.save(user);

        return userMapper.toUserResponseDTO(persistedUser);
    }

    @Transactional
    public void deleteUser(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User with id " + id + " not found"));
        userRepository.delete(user);
    }
}
