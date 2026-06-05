package com.truecolours.backend.enums;

public enum QuestionTag {
    CLASSIC("classic"),
    SPICY("spicy");

    private final String value;

    QuestionTag(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static QuestionTag fromValue(String value) {
        if (value == null || value.isBlank()) {
            return CLASSIC;
        }
        for (QuestionTag tag : values()) {
            if (tag.value.equalsIgnoreCase(value)) {
                return tag;
            }
        }
        return CLASSIC;
    }
}
