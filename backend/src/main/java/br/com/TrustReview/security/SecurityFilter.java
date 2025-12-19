package br.com.TrustReview.security;

import br.com.TrustReview.exception.UserNotFound;
import br.com.TrustReview.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    JWTTokenService jwtTokenService;
    @Autowired
    UserRepository userRepository;

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
    
        if (tk!=null) {
            var subject = jwtTokenService.validateToken(tk);
            UserDetails user = userRepository.findByEmail(subject)
                    .orElseThrow(() -> new UserNotFound("User with email" +subject));
            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(req, res);
    }

    private String recoverToken(HttpServletRequest req) {
        var authHeader = req.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
