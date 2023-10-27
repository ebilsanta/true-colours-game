package com.truecolours.backend.exception;

public class NotFoundException extends Exception {
    final private String message;
    public NotFoundException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
