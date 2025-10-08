package br.com.TrustReview.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = Tag.TABLE_NAME)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {
    public static final String TABLE_NAME = "User";

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

    @Column(name = "userType", length = 20, nullable = false)
    private UserTypeEnum userType;
}
