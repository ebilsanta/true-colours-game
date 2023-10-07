package com.truecoloursgame.controller;

import com.truecoloursgame.controller.dto.HostRequest;
import com.truecoloursgame.controller.dto.JoinRequest;
import com.truecoloursgame.model.Player;
import com.truecoloursgame.service.RoomService;
import com.truecoloursgame.exception.InvalidRoomException;
import com.truecoloursgame.exception.NotFoundException;
import com.truecoloursgame.model.Answer;
import com.truecoloursgame.model.Room;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@CrossOrigin(origins="*")
@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/create")
    public ResponseEntity<Room> start(@RequestBody Player player) {
        log.info("Create room request: {}", player);
        return ResponseEntity.ok(roomService.createRoom(player));
    }
    @PostMapping("/join")
    public ResponseEntity<Room> join(@RequestBody JoinRequest request) throws NotFoundException, InvalidRoomException {
        log.info("Join request: {}", request);
        Room room = roomService.joinRoom(request.getPlayer(), request.getRoomId());
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
    public ResponseEntity<Room> answer(@RequestBody Answer request) throws NotFoundException {
        log.info("Answer: {}", request);
        Room room = roomService.answer(request);
        simpMessagingTemplate.convertAndSend("/topic/room-progress" + room.getRoomId(), room);
        return ResponseEntity.ok(room);
    }
    @PostMapping("/question-results")
    public ResponseEntity<Room> questionResults(@RequestBody HostRequest request) throws NotFoundException {
        log.info("Question results: {}", request);
        Room room = roomService.showQuestionResults(request.getRoomId());
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
