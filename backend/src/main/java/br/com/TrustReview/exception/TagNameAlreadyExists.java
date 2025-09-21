package br.com.TrustReview.exception;

public class TagNameAlreadyExists extends RuntimeException {
    public TagNameAlreadyExists(String message) {
        super(message);
    }
}
