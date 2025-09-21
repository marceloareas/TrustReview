package br.com.TrustReview.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

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
public class SecurityConfig {

    // No momento está sem autenticação
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())  // desabilita CSRF para testes
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/h2-console/**").permitAll()
                    .anyRequest().permitAll())  // libera tudo
            .headers(headers -> headers.frameOptions().disable());
        return http.build();
    }

}
