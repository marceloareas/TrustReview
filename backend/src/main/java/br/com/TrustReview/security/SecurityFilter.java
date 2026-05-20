package br.com.TrustReview.security;

import br.com.TrustReview.model.User;
import br.com.TrustReview.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    JWTTokenService jwtTokenService;
    @Autowired
    UserRepository userRepository;

    @Override
    public void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        String path = req.getServletPath();
        // 🔹 IGNORA ROTAS PÚBLICAS E SWAGGER
        if (path.startsWith("/swagger-ui")
                || path.startsWith("/v3/api-docs")
                || path.equals("/swagger-ui.html")
                || path.startsWith("/h2-console")
                || path.equals("/api/v1/user/login")
                || path.equals("/api/v1/user")) {

            chain.doFilter(req, res);
            return;
        }

        var tk = this.recoverToken(req);

        if (tk != null && !tk.isBlank()) {
            var subject = jwtTokenService.validateToken(tk);
            if (subject != null && !subject.isBlank()) {
                userRepository.findByEmail(subject).ifPresent(this::authenticate);
            }
        }

        chain.doFilter(req, res);
    }

    private void authenticate(User user) {
        var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String recoverToken(HttpServletRequest req) {
        var authHeader = req.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
