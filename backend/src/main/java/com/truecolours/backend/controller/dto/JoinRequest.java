package com.truecolours.backend.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JoinRequest {
    @NotBlank(message = "name cannot be empty")
    private String name;
    @NotBlank(message = "roomId cannot be empty")
    private int roomId;
}
