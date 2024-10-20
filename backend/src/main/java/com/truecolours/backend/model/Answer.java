package com.truecolours.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Answer {

    private int roomId;
    private int playerId;
    private int prediction;
    private int votedPlayer1Id;
    private int votedPlayer2Id;
}
