package com.truecoloursgame.exception;

public class InvalidRoomException extends Exception {
    final private String message;
    public InvalidRoomException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
