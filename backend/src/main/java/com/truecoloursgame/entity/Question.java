package com.truecoloursgame.entity;

import jakarta.persistence.*;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String question;

    public Question(String question) {
        this.question = question;
    }

    public Integer getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
