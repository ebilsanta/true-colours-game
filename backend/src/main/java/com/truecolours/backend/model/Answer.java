package com.truecolours.backend.model;

import lombok.Data;

@Data
public class Answer {

    private String roomId;
    private int playerId;
    private int prediction;
    private Integer votedPlayer1Id;
    private Integer votedPlayer2Id;
}
