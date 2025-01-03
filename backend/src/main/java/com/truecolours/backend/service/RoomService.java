package com.truecolours.backend.service;

import com.truecolours.backend.entity.Question;
import com.truecolours.backend.exception.*;
import com.truecolours.backend.exception.InvalidRoomException;
import com.truecolours.backend.model.Answer;
import com.truecolours.backend.model.Player;
import com.truecolours.backend.model.Room;
import com.truecolours.backend.enums.RoomStatus;
import com.truecolours.backend.repository.QuestionRepository;
import com.truecolours.backend.storage.RoomStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@AllArgsConstructor
public class RoomService {
    private QuestionRepository questionRepository;
    private final ConcurrentHashMap<Integer, Object> locks = new ConcurrentHashMap<>();

    public Room createRoom(Player player) {
        int roomId = (int)(Math.random() * 900000) + 100000;
        List<String> questionsAsStrings = getQuestionsAsStrings();
        Room room = new Room(roomId, questionsAsStrings);
        addPlayer(room, player);
        initializeRoom(room);
        return room;
    }
    private List<String> getQuestionsAsStrings() {
        List<Question> questions = questionRepository.getRandomQuestions();
        List<String> questionsAsStrings = new ArrayList<>();
        for (Question question : questions) {
            questionsAsStrings.add(question.getQuestion());
        }
        return questionsAsStrings;
    }
    private void initializeRoom(Room room) {
        room.setStatus(RoomStatus.WAITING);
        RoomStorage.getInstance().setRoom(room);
    }
    public Room joinRoom(Player player, int roomId) throws InvalidRoomException, NotFoundException {
        Object roomLock = locks.computeIfAbsent(roomId, k -> new Object());
        synchronized (roomLock) {
            Room room = getValidRoomForJoining(roomId);
            addPlayer(room, player);
            RoomStorage.getInstance().setRoom(room);
            return room;
        }
    }
    private Room getValidRoomForJoining(int roomId) throws InvalidRoomException, NotFoundException {
        Room room = getRoomFromStorage(roomId);
        if (room.getStatus() != RoomStatus.WAITING) {
            throw new InvalidRoomException("Room is not valid anymore");
        }
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

        Map<Integer, Integer> addedScores = room.getAddedScores();
        addedScores.put(newPlayerId, 0);

        Map<Integer, List<Integer>> votes = room.getVotes();
        votes.put(newPlayerId, new ArrayList<>());

        room.setNewPlayerId(newPlayerId+1);
    }

    public Room nextQuestion(int roomId) throws NotFoundException {
        if (!RoomStorage.getInstance().getRooms().containsKey(roomId)) {
            throw new NotFoundException("Room does not exist");
        }
        Object roomLock = locks.computeIfAbsent(roomId, k -> new Object());
        synchronized(roomLock) {
            Room room = RoomStorage.getInstance().getRooms().get(roomId);
            resetVotes(room);
            resetPlayersAnswered(room);
            room.setQuestionNumber(room.getQuestionNumber()+1);
            room.setStatus(RoomStatus.QUESTION_IN_PROGRESS);
            RoomStorage.getInstance().setRoom(room);
            return room;
        }
    }

    public void resetVotes(Room room) {
        Map<Integer, List<Integer>> votes = room.getVotes();
        for(Map.Entry<Integer, List<Integer>> entry: votes.entrySet()) {
            entry.getValue().clear();
        }
    }

    public void resetPlayersAnswered(Room room) {
        Map<Integer, Boolean> playersAnswered = room.getPlayersAnswered();
        playersAnswered.replaceAll((p, v) -> false);
    }

    public Room answer(Answer answer) throws NotFoundException {
        int roomId = answer.getRoomId();
        int playerId = answer.getPlayerId();
        int votedPlayer1Id = answer.getVotedPlayer1Id();
        int votedPlayer2Id = answer.getVotedPlayer2Id();
        if (!RoomStorage.getInstance().getRooms().containsKey(roomId)) {
            throw new NotFoundException("Room does not exist");
        }
        Object roomLock = locks.computeIfAbsent(roomId, k -> new Object());
        synchronized (roomLock) {
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
                return showQuestionResults(room);
            }
            RoomStorage.getInstance().setRoom(room);
            return room;
        }
    }

    public Room showQuestionResults(Room room) throws NotFoundException {
        calculateScores(room);
        room.setStatus(RoomStatus.QUESTION_RESULTS);
        RoomStorage.getInstance().setRoom(room);
        return room;
    }

    public Room showRoomResults(int roomId) throws NotFoundException {
        if (!RoomStorage.getInstance().getRooms().containsKey(roomId)) {
            throw new NotFoundException("Room does not exist");
        }
        Room room = RoomStorage.getInstance().getRooms().get(roomId);
        room.setStatus(RoomStatus.ROOM_RESULTS);
        RoomStorage.getInstance().setRoom(room);
        return room;
    }

    public Room getRoom(int roomId) throws NotFoundException {
        if (!RoomStorage.getInstance().getRooms().containsKey(roomId)) {
            throw new NotFoundException("Room does not exist");
        }
        return RoomStorage.getInstance().getRooms().get(roomId);
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
        Map<Integer, Integer> addedScores = room.getAddedScores();
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
                addedScores.put(playerId, 3);
            } else if (prediction == 1 && numVotes >= 1 && numVotes < maxVotes) {
                scores.put(playerId, score + 1);
                addedScores.put(playerId, 1);
            } else if (prediction == 2 && numVotes == maxVotes) {
                scores.put(playerId, score + 3);
                addedScores.put(playerId, 3);
            } else {
                addedScores.put(playerId, 0);
            }
        }
    }

    private Room getRoomFromStorage(int roomId) throws NotFoundException {
        Map<Integer, Room> rooms = RoomStorage.getInstance().getRooms();
        if (!rooms.containsKey(roomId)) {
            throw new NotFoundException("Room does not exist");
        }
        return rooms.get(roomId);
    }

    public void removeLock(int roomId) {
        locks.remove(roomId);
    }
}

