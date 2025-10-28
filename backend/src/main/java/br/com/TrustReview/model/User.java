package br.com.TrustReview.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = User.TABLE_NAME)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User implements UserDetails {
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        if(userType == UserTypeEnum.ADMIN){
            return List.of(new SimpleGrantedAuthority("ADMIN"), new SimpleGrantedAuthority("COSTUMER"));
        }else{
            return List.of(new SimpleGrantedAuthority("COSTUMER"));
        }
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
