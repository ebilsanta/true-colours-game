package com.truecolours.backend.controller.dto;

import com.truecolours.backend.model.Player;
import lombok.Data;

@Data
public class JoinRequest {
    private Player player;
    private String roomId;
}
