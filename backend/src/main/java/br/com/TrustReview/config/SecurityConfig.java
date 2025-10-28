package br.com.TrustReview.config;

import br.com.TrustReview.security.SecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuração de segurança da aplicação.
 *
 * <p>
 * Esta classe define as regras de segurança para as requisições HTTP utilizando Spring Security.
 * No momento, todas as rotas estão liberadas (sem autenticação) e o CSRF está desabilitado,
 * facilitando testes e o acesso ao console do H2.
 * </p>
 *
 * <ul>
 *   <li>Desabilita CSRF para facilitar testes.</li>
 *   <li>Permite acesso irrestrito ao console do H2.</li>
 *   <li>Liberado acesso a todas as demais rotas.</li>
 *   <li>Desabilita frameOptions para permitir o uso do H2-console.</li>
 * </ul>
 *
 * @author HeraniFilho
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    SecurityFilter securityFilter;

    // No momento está sem autenticação
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())  // desabilita CSRF para testes
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/h2-console/**").permitAll()
//                        .anyRequest().permitAll())  // libera tudo
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))   // fica stateless
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/api/v1/tags").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/products").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/user/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/user").permitAll()
                        //.requestMatchers(HttpMethod.DELETE, "./user").hasRole("ADMIN")  //for test
                        .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .headers(headers -> headers.frameOptions().disable());
        return http.build();
    }

}
