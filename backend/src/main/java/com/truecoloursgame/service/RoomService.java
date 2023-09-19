package com.truecoloursgame.service;

import com.truecoloursgame.model.Player;
import com.truecoloursgame.repository.QuestionRepository;
import com.truecoloursgame.storage.RoomStorage;
import com.truecoloursgame.exception.InvalidRoomException;
import com.truecoloursgame.exception.NotFoundException;
import com.truecoloursgame.model.Answer;
import com.truecoloursgame.model.Room;
import com.truecoloursgame.model.RoomStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

import com.truecoloursgame.entity.Question;

@Service
@AllArgsConstructor
public class RoomService {
    // May need to store room in database?
    private  QuestionRepository questionRepository;

    public Room createRoom(Player player) {
        String roomId = UUID.randomUUID().toString();
        List<Question> questions = questionRepository.getRandomQuestions();
        List<String> questionsAsStrings = new ArrayList<>();
        for (Question question: questions) {
            questionsAsStrings.add(question.getQuestion());
        }
        Room room = new Room(roomId, questionsAsStrings);
        addPlayer(room, player);
        room.setStatus(RoomStatus.WAITING);
        RoomStorage.getInstance().setRoom(room);
        return room;
    }
    // May need to return void. no point returning game
    public Room joinRoom(Player player, String roomId) throws NotFoundException, InvalidRoomException {
        if (!RoomStorage.getInstance().getRooms().containsKey(roomId)) {
            throw new NotFoundException("Room does not exist");
        }
        Room room = RoomStorage.getInstance().getRooms().get(roomId);

        if (room.getStatus() != RoomStatus.WAITING) {
            throw new InvalidRoomException("Room is not valid anymore");
        }

        addPlayer(room, player);
        RoomStorage.getInstance().setRoom(room);
        return room;
    }

    public void addPlayer(Room room, Player player) {
        Map<Integer, Player> players = room.getPlayers();
        int newPlayerId = room.getNewPlayerId();
        players.put(newPlayerId, player);

        Map<Integer, Boolean> playersAnswered = room.getPlayersAnswered();
        playersAnswered.put(newPlayerId, false);

        Map<Integer, Integer> scores = room.getScores();
        scores.put(newPlayerId, 0);

        room.setNewPlayerId(newPlayerId+1);
    }

    public Room nextQuestion(String roomId) throws NotFoundException {
        if (!RoomStorage.getInstance().getRooms().containsKey(roomId)) {
            throw new NotFoundException("Room does not exist");
        }
        Room room = RoomStorage.getInstance().getRooms().get(roomId);
        resetVotes(room);
        room.setQuestionNumber(room.getQuestionNumber()+1);
        room.setStatus(RoomStatus.QUESTION_IN_PROGRESS);
        RoomStorage.getInstance().setRoom(room);
        return room;
    }

    public void resetVotes(Room room) {
        Map<Integer, List<Integer>> votes = room.getVotes();
        for(Map.Entry<Integer, List<Integer>> entry: votes.entrySet()) {
            entry.getValue().clear();
        }
    }

    public Room answer(Answer answer) throws NotFoundException {
        String roomId = answer.getRoomId();
        int playerId = answer.getPlayerId();
        int votedPlayer1Id = answer.getVotedPlayer1Id();
        int votedPlayer2Id = answer.getVotedPlayer2Id();
        if (!RoomStorage.getInstance().getRooms().containsKey(roomId)) {
            throw new NotFoundException("Room does not exist");
        }
        Room room = RoomStorage.getInstance().getRooms().get(roomId);

        Map<Integer, Player> players = room.getPlayers();
        if (!playerExists(players, playerId)) {
            throw new NotFoundException("Player does not exist");
        }

        if (!playerExists(players, votedPlayer1Id) || !playerExists(players, votedPlayer2Id)) {
            throw new NotFoundException("Voted player does not exist");
        }
        room.addPrediction(playerId, answer.getPrediction());
        room.addVote(playerId, votedPlayer1Id);
        room.addVote(playerId, votedPlayer2Id);
        room.markPlayerAnswered(playerId);

        if (allPlayersAnswered(room.getPlayersAnswered())) {
            room.setStatus(RoomStatus.QUESTION_COMPLETED);
        }
        RoomStorage.getInstance().setRoom(room);
        return room;
    }

    public Room showQuestionResults(String roomId) throws NotFoundException {
        if (!RoomStorage.getInstance().getRooms().containsKey(roomId)) {
            throw new NotFoundException("Room does not exist");
        }
        Room room = RoomStorage.getInstance().getRooms().get(roomId);
        calculateScores(room);
        room.setStatus(RoomStatus.QUESTION_RESULTS);
        RoomStorage.getInstance().setRoom(room);
        return room;
    }

    public Room showRoomResults(String roomId) throws NotFoundException {
        if (!RoomStorage.getInstance().getRooms().containsKey(roomId)) {
            throw new NotFoundException("Room does not exist");
        }
        Room room = RoomStorage.getInstance().getRooms().get(roomId);
        room.setStatus(RoomStatus.ROOM_RESULTS);
        RoomStorage.getInstance().setRoom(room);
        return room;
    }

    public boolean playerExists(Map<Integer, Player> players, int playerId) {
        return players.containsKey(playerId);
    }

    public boolean allPlayersAnswered(Map<Integer, Boolean> playersAnswered) {
        for(Map.Entry<Integer, Boolean> entry: playersAnswered.entrySet()) {
            if (!entry.getValue()) {
                return false;
            }
        }
        return true;
    }

    public void calculateScores(Room room) {
        int maxVotes = 0;
        Map<Integer, List<Integer>> votes = room.getVotes();
        Map<Integer, Integer> predictions = room.getPredictions();
        Map<Integer, Integer> scores = room.getScores();
        // Get maxVotes
        for(Map.Entry<Integer, List<Integer>> entry: votes.entrySet()) {
            int numVotes = entry.getValue().size();
            maxVotes = Math.max(maxVotes, numVotes);
        }
        // Add scores for those who received max votes
        for(Map.Entry<Integer, List<Integer>> entry: votes.entrySet()) {
            int playerId = entry.getKey();
            int score = scores.get(playerId);
            int numVotes = entry.getValue().size();
            int prediction = predictions.get(playerId);

            if (prediction == 0 && numVotes == 0) {
                scores.put(playerId, score + 3);
            } else if (prediction == 1 && numVotes >= 1 && numVotes < maxVotes) {
                scores.put(playerId, score + 1);
            } else if (prediction == 2 && numVotes == maxVotes) {
                scores.put(playerId, score + 3);
            }
        }

    }
}
