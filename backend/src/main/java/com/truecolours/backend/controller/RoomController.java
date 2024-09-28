package com.truecolours.backend.controller;

import com.truecolours.backend.controller.dto.AnswerRequest;
import com.truecolours.backend.controller.dto.CreateRoomRequest;
import com.truecolours.backend.controller.dto.HostRequest;
import com.truecolours.backend.controller.dto.JoinRequest;
import com.truecolours.backend.exception.*;
import com.truecolours.backend.model.Answer;
import com.truecolours.backend.model.Player;
import com.truecolours.backend.model.Room;
import com.truecolours.backend.service.RoomService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="*")
@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/create")
    public ResponseEntity<Room> create(@RequestBody CreateRoomRequest request) {
        Player player = new Player(request.getName());
        log.info("Create room request: {}", player);
        return ResponseEntity.ok(roomService.createRoom(player));
    }
    @PostMapping("/join")
    public ResponseEntity<Room> join(@RequestBody JoinRequest request) throws NotFoundException, InvalidRoomException {
        log.info("Join request: {}", request);
        Room room = roomService.joinRoom(new Player(request.getName()), request.getRoomId());
        simpMessagingTemplate.convertAndSend("/topic/room-progress" + room.getRoomId(), room);
        return ResponseEntity.ok(room);
    }
    @PostMapping("/next-question")
    public ResponseEntity<Room> start(@RequestBody HostRequest request) throws NotFoundException, InvalidRoomException {
        log.info("Start request: {}", request);
        Room room = roomService.nextQuestion(request.getRoomId());
        simpMessagingTemplate.convertAndSend("/topic/room-progress" + room.getRoomId(), room);
        return ResponseEntity.ok(room);
    }
    @PostMapping("/answer")
    public ResponseEntity<Room> answer(@RequestBody AnswerRequest request) throws NotFoundException {
        log.info("Answer: {}", request);
        Answer answer = new Answer(
                request.getRoomId(),
                request.getPlayerId(),
                request.getPrediction(),
                request.getVotedPlayer1Id(),
                request.getVotedPlayer2Id()
        );
        Room room = roomService.answer(answer);
        simpMessagingTemplate.convertAndSend("/topic/room-progress" + room.getRoomId(), room);
        return ResponseEntity.ok(room);
    }
    @PostMapping("/room-results")
    public ResponseEntity<Room> roomResults(@RequestBody HostRequest request) throws NotFoundException {
        log.info("Room results: {}", request);
        Room room = roomService.showRoomResults(request.getRoomId());
        simpMessagingTemplate.convertAndSend("/topic/room-progress" + room.getRoomId(), room);
        return ResponseEntity.ok(room);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<Room> getRoom(@PathVariable("roomId") String roomId) throws NotFoundException {
        log.info("Room request: {}", roomId);
        Room room = roomService.getRoom(roomId);
        return ResponseEntity.ok(room);
    }
}

