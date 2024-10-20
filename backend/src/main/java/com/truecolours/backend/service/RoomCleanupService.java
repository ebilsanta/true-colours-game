package com.truecolours.backend.service;

import com.truecolours.backend.model.Room;
import com.truecolours.backend.storage.RoomStorage;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;

@Service
@AllArgsConstructor
public class RoomCleanupService {
    private static final long ROOM_LIFETIME_HOURS = 4;
    private final RoomService roomService;

    @Scheduled(fixedRate = 3600000)
    public void cleanup() {
        Instant now = Instant.now();
        RoomStorage roomStorage = RoomStorage.getInstance();
        Map<Integer, Room> rooms = RoomStorage.getInstance().getRooms();
        for (int roomId: rooms.keySet()) {
            Room room = rooms.get(roomId);
            Instant roomCreationTime = room.getCreatedAt();
            if (Duration.between(roomCreationTime, now).toHours() >= ROOM_LIFETIME_HOURS) {
                roomStorage.getRooms().remove(roomId);
                roomService.removeLock(roomId);
            }
        }
    }
}
