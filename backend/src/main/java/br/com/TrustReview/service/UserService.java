package br.com.TrustReview.service;

import br.com.TrustReview.dto.UserRequestDTO;
import br.com.TrustReview.dto.UserResponseDTO;
import br.com.TrustReview.exception.UserEmailAlredyExits;
import br.com.TrustReview.mapper.UserMapper;
import br.com.TrustReview.model.User;
import br.com.TrustReview.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

        String EncryptedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(EncryptedPassword);

        User persistedUser = userRepository.save(user);
        persistedUser.setPassword("");
        log.info("User created: {}", user);

        return userMapper.toUserResponseDTO(persistedUser);
    }
}
