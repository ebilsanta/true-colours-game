package com.truecolours.backend.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateRoomRequest {

    @NotBlank(message = "name cannot be blank")
    private String name;
}
