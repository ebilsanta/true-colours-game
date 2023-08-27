package com.truecoloursgame.controller.dto;

import com.truecoloursgame.model.Player;
import lombok.Data;

@Data
public class JoinRequest {
    private Player player;
    private String roomId;
}
