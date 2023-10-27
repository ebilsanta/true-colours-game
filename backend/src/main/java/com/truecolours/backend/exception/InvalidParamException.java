package com.truecolours.backend.exception;

public class InvalidParamException extends Exception {
    final private String message;
    public InvalidParamException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
