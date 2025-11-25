package br.com.TrustReview.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UserInvalidPrivileges extends RuntimeException {
    public UserInvalidPrivileges(String message) {
        super(message);
    }
}
