package com.truecolours.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Prediction {
    NEW, IN_PROGRESS, COMPLETED
}
