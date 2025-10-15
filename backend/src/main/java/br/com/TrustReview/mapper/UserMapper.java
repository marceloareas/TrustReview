package br.com.TrustReview.mapper;

import br.com.TrustReview.dto.UserRequestDTO;
import br.com.TrustReview.dto.UserResponseDTO;
import br.com.TrustReview.model.User;
import br.com.TrustReview.model.UserTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Schema
public class UserMapper {
    public User toUser(UserRequestDTO requestDTO) {
        User user = new User();
        user.setName(requestDTO.getName());
        user.setEmail(requestDTO.getEmail());
        user.setPassword(requestDTO.getPassword());
        user.setUserType(UserTypeEnum.COSTUMER);        //Evita forçar admins no banco
        return user;
    }

    public User toUserCreate(UserRequestDTO requestDTO) {
        User user = new User();
        user.setName(requestDTO.getName());
        user.setEmail(requestDTO.getEmail());
        user.setPassword(requestDTO.getPassword());
        user.setUserType(UserTypeEnum.COSTUMER);        //Evita forçar admins no banco
        return user;
    }

    public UserResponseDTO toUserResponseDTO(User user) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setId(user.getId());
        userResponseDTO.setName(user.getName());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setPassword(user.getPassword());
        userResponseDTO.setUserType(user.getUserType());
        return userResponseDTO;
    }

    public UserResponseDTO toUserResponseDTO(UserRequestDTO  userRequestDTO) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setName(userRequestDTO.getName());
        userResponseDTO.setEmail(userRequestDTO.getEmail());
        userResponseDTO.setPassword(userRequestDTO.getPassword());
        userResponseDTO.setUserType(UserTypeEnum.COSTUMER);     // Pode dar problemas em outras regras de negócio
        return userResponseDTO;
    }
}
