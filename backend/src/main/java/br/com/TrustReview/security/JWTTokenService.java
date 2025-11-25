package br.com.TrustReview.security;

import br.com.TrustReview.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Map;

@Service
public class JWTTokenService {

    @Value("${jwt.secret}")
    private String SECRET;
    //private static final String SECRET = "secret";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;


    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            String tk = JWT.create()
                    .withIssuer("Trust-Review")
                    .withSubject(user.getEmail())
                    .withClaim("name", user.getName())
                    .withClaim("userType", user.getUserType().toString())
                    .withIssuedAt(new Date())
                    .withExpiresAt(getExpirationTime())
                    .sign(algorithm);

            return tk;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error criando token jwt", e);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);

            return JWT.require(algorithm)
                    .withIssuer("Trust-Review")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch(JWTVerificationException e) {
            //throw new RuntimeException("Error validando token jwt", e);
            return "";  //string vazia já diz que não retornou usuário
        }
    }

    private Instant getExpirationTime() {
        return LocalDateTime.now().plusSeconds(EXPIRATION_TIME).toInstant(ZoneOffset.of("-03:00"));
    }
}
