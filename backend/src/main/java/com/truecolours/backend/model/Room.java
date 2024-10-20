package com.truecolours.backend.model;

import com.truecolours.backend.enums.RoomStatus;
import lombok.Data;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class Room {

    private int roomId;
    private Map<Integer, Player> players = new HashMap<>();
    private int hostId;
    private int newPlayerId;
    private Map<Integer, List<Integer>> votes = new HashMap<>();
    private Map<Integer, Integer> predictions = new HashMap<>();
    private Map<Integer, Boolean> playersAnswered = new HashMap<>();
    private Map<Integer, Integer> scores = new HashMap<>();
    private Map<Integer, Integer> addedScores = new HashMap<>();
    private Instant createdAt = Instant.now();
    private List<String> questions;
    private int questionNumber = -1;
    private RoomStatus status;

    public Room(int roomId, List<String> questions) {
        this.questions = questions;
        this.roomId = roomId;
    }

    public void markPlayerAnswered(int playerId) {
        playersAnswered.put(playerId, true);
    }

    public void addPrediction(int playerId, int prediction) {
        predictions.put(playerId, prediction);
    }

    public void addVote(int playerId, int votedPlayerId) {
        votes.computeIfAbsent(votedPlayerId, k -> new ArrayList<Integer>());
        votes.get(votedPlayerId).add(playerId);
    }
}
