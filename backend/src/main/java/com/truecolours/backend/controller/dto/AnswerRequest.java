package com.truecolours.backend.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AnswerRequest {
    @NotBlank(message = "roomId cannot be blank")
    private String roomId;

    @NotBlank(message = "playerId cannot be blank")
    private int playerId;

    @NotBlank(message = "prediction cannot be blank")
    private int prediction;

    @NotBlank(message = "votedPlayer1Id cannot be blank")
    private int votedPlayer1Id;

    @NotBlank(message = "votedPlayer2Id cannot be blank")
    private int votedPlayer2Id;
}
