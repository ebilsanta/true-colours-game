package com.truecolours.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.truecolours.backend.model.Player;
import com.truecolours.backend.model.Room;
import com.truecolours.backend.repository.QuestionRepository;
import com.truecolours.backend.service.RoomService;

public class RoomServiceTests {
    private RoomService roomService;
    private Room room;

    @BeforeEach
    void setUp() {
        roomService = new RoomService(Mockito.mock(QuestionRepository.class));
        room = Mockito.mock(Room.class);
    }

     @Test
    public void testAddPlayer() {
        Player player = new Player("abc");
        Map<Integer, Player> players = new HashMap<>();
        Map<Integer, Boolean> playersAnswered = new HashMap<>();
        Map<Integer, Integer> scores = new HashMap<>();
        Map<Integer, Integer> addedScores = new HashMap<>();
        Map<Integer, List<Integer>> votes = new HashMap<>();
        when(room.getPlayers()).thenReturn(players);
        when(room.getPlayersAnswered()).thenReturn(playersAnswered);
        when(room.getScores()).thenReturn(scores);
        when(room.getAddedScores()).thenReturn(addedScores);
        when(room.getVotes()).thenReturn(votes);
        when(room.getNewPlayerId()).thenReturn(1);

        roomService.addPlayer(room, player);

        assertEquals(player, players.get(1));
        assertEquals(false, playersAnswered.get(1));
        assertEquals(0, scores.get(1));
        assertEquals(0, addedScores.get(1));
        assertEquals(new ArrayList<>(), votes.get(1));
    }

    @Test
    public void testResetVotes() {
        Map<Integer, List<Integer>> votes = new HashMap<>();
        votes.put(1, new ArrayList<>());
        votes.get(1).add(2);
        when(room.getVotes()).thenReturn(votes);

        roomService.resetVotes(room);

        assertEquals(new ArrayList<>(), votes.get(1));
    }

    @Test
    public void testResetPlayersAnswered() {
        Map<Integer, Boolean> playersAnswered = new HashMap<>();
        playersAnswered.put(1, true);
        when(room.getPlayersAnswered()).thenReturn(playersAnswered);

        roomService.resetPlayersAnswered(room);

        assertEquals(false, playersAnswered.get(1));
    }

    @Test
    public void testPlayerExists() {
        // Arrange
        Map<Integer, Player> players = new HashMap<>();
        players.put(1, new Player("abc"));
        RoomService roomService = new RoomService(null);

        // Act
        boolean result = roomService.playerExists(players, 1);

        // Assert
        assertTrue(result);
    }

    @Test
    void testAllPlayersAnswered() {
        Map<Integer, Boolean> playersAnswered = new HashMap<>();
        playersAnswered.put(1, true);
        playersAnswered.put(2, true);

        assertTrue(roomService.allPlayersAnswered(playersAnswered));

        playersAnswered.put(3, false);

        assertFalse(roomService.allPlayersAnswered(playersAnswered));
    }
    
    @Test
    public void testCalculateScores() {
        Map<Integer, List<Integer>> votes = new HashMap<>();
        Map<Integer, Integer> predictions = new HashMap<>();
        Map<Integer, Integer> scores = new HashMap<>();
        Map<Integer, Integer> addedScores = new HashMap<>();
        List<Integer> playerVotes = new ArrayList<>();
        playerVotes.add(1);
        votes.put(1, playerVotes);
        predictions.put(1, 2);
        scores.put(1, 0);
        addedScores.put(1, 0);
        when(room.getVotes()).thenReturn(votes);
        when(room.getPredictions()).thenReturn(predictions);
        when(room.getScores()).thenReturn(scores);
        when(room.getAddedScores()).thenReturn(addedScores);

        roomService.calculateScores(room);

        assertEquals(3, scores.get(1));
        assertEquals(3, addedScores.get(1));
    }
}
