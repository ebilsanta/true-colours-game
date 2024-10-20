package com.truecolours.backend.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class HostRequest {
    @NotBlank(message = "roomId cannot be blank")
    private int roomId;
}
