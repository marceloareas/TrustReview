package br.com.TrustReview.exception;

public class UserEmailAlredyExits extends RuntimeException {
    public UserEmailAlredyExits(String message) {
        super(message);
    }
}
