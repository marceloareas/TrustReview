package br.com.TrustReview.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = User.TABLE_NAME)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {
    public static final String TABLE_NAME = "users";

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", length = 150, nullable = false, unique = false)
    private String name;

    @Column(name = "email", length = 80, nullable = false,unique = false)
    private String email;

    @Column(name = "password", nullable = false, unique = false)
    private String password;

    @Column(name = "userType", length = 20, nullable = false, unique = false)
    private UserTypeEnum userType = UserTypeEnum.COSTUMER;
}
