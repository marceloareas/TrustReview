package br.com.TrustReview.service;

import br.com.TrustReview.dto.UserRequestDTO;
import br.com.TrustReview.dto.UserRequestLoginDTO;
import br.com.TrustReview.dto.UserResponseDTO;
import br.com.TrustReview.dto.UserResponseLoginDTO;
import br.com.TrustReview.exception.InvalidCredentials;
import br.com.TrustReview.exception.UserEmailAlreadyExists;
import br.com.TrustReview.exception.UserInvalidPrivileges;
import br.com.TrustReview.exception.UserNotFound;
import br.com.TrustReview.mapper.UserMapper;
import br.com.TrustReview.model.User;
import br.com.TrustReview.model.UserTypeEnum;
import br.com.TrustReview.repository.UserRepository;
import br.com.TrustReview.security.JWTTokenService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.usertype.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private static final Pattern emailRegexPattern = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");    //para email
    private static final Pattern passwordRegexPattern = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"); //para senhas


    @Autowired
    JWTTokenService jwtTokenService;

    @Transactional
    public UserResponseLoginDTO createUser(UserRequestDTO userRequestDTO) {

        if (userRequestDTO.getEmail() == null) {
            log.error("Email is null");
            throw new IllegalArgumentException("Email is null");
        }

        if (!emailRegexPattern.matcher(userRequestDTO.getEmail()).matches()) {
            log.error("Invalid email");
            throw new IllegalArgumentException("Invalid email pattern");
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

        if (!passwordRegexPattern.matcher(userRequestDTO.getPassword()).matches()) {
            log.error("Invalid password");
            throw new IllegalArgumentException("Invalid password pattern: ao menos 8 digítos, um símbolo, umas letra maiúscula e uma minúscula");
        }

        User user = userMapper.toUserCreate(userRequestDTO);

        String EncryptedPassword = passwordEncoder.encode(userRequestDTO.getPassword());
        //String EncryptedPassword = BCrypt.hashpw(userRequestDTO.getPassword(), BCrypt.gensalt());
        user.setPassword(EncryptedPassword);

        User persistedUser = userRepository.save(user);
        log.info("User created: {}", user);

        var tk = jwtTokenService.generateToken(persistedUser);

        return userMapper.toUserResponseLoginDTO(persistedUser, tk);
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
        if (!emailRegexPattern.matcher(email).matches()) {
            log.error("Invalid email");
            throw new IllegalArgumentException("Invalid email pattern");
        }

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
                case "email" -> {
                    if (!emailRegexPattern.matcher((String) value).matches()) {
                        log.error("Invalid email");
                        throw new IllegalArgumentException("Invalid email pattern");
                    }
                    user.setEmail((String) value);
                }
                case "password" -> {
                    if (!passwordRegexPattern.matcher((String) value).matches()) {
                        log.error("Invalid password");
                        throw new IllegalArgumentException("Invalid password pattern: ao menos 8 digítos, um símbolo, umas letra maiúscula e uma minúscula");
                    }

                    String EncryptedPassword = passwordEncoder.encode((String) value);
                    //String EncryptedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
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

        if (!emailRegexPattern.matcher(userRequestDTO.getEmail()).matches()) {
            log.error("Invalid email");
            throw new IllegalArgumentException("Invalid email pattern");
        }

        if (userRequestDTO.getPassword() == null) {
            log.error("Password is null");
            throw new IllegalArgumentException("Password is null");
        }

        if (!passwordRegexPattern.matcher(userRequestDTO.getPassword()).matches()) {
            log.error("Invalid password");
            throw new IllegalArgumentException("Invalid password pattern: ao menos 8 digítos, um símbolo, umas letra maiúscula e uma minúscula");
        }

        String EncryptedPassword = passwordEncoder.encode(userRequestDTO.getPassword());
        //String EncryptedPassword = BCrypt.hashpw(userRequestDTO.getPassword(), BCrypt.gensalt());
        user.setPassword(EncryptedPassword);
        user.setEmail(userRequestDTO.getEmail());
        user.setName(userRequestDTO.getName());

        User persistedUser = userRepository.save(user);

        return userMapper.toUserResponseDTO(persistedUser);
    }

    @Transactional
    public void deleteUser(UUID id, UserRequestLoginDTO userRequestDTO) {
        if (!emailRegexPattern.matcher(userRequestDTO.getEmail()).matches()) {
            log.error("Invalid email");
            throw new IllegalArgumentException("Invalid email pattern");
        }

        User user = userRepository.findByEmail(userRequestDTO.getEmail())
                .orElseThrow(() -> new UserNotFound(
                        "User with email " + userRequestDTO.getEmail() + " not found"
                ));

        if (!user.getId().equals(id) && user.getUserType() != UserTypeEnum.ADMIN) {
            throw new UserInvalidPrivileges(
                    "User with email " + userRequestDTO.getEmail() + " is trying to delete another user"
            );
        }

//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new UserNotFound("User with id " + id + " not found"));

        userRepository.delete(user);
    }

    @Transactional
    public UserResponseLoginDTO loginUser(UserRequestLoginDTO userRequestLoginDTO) {
        if (!emailRegexPattern.matcher(userRequestLoginDTO.getEmail()).matches()) {
            log.error("Invalid email");
            throw new IllegalArgumentException("Invalid email pattern");
        }

        User user = userRepository.findByEmail(userRequestLoginDTO.getEmail())
                .orElseThrow(() -> new UserNotFound("User with email " + userRequestLoginDTO.getEmail() + " not found"));


        if (!passwordEncoder.matches(userRequestLoginDTO.getPassword(), user.getPassword())) {
            throw new InvalidCredentials("Invalid credentials, senha inválida");
        }

        var tk = jwtTokenService.generateToken(user);

        return userMapper.toUserResponseLoginDTO(user, tk);
    }
}
