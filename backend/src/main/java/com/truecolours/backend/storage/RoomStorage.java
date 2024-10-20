package com.truecolours.backend.storage;

import com.truecolours.backend.model.Room;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class RoomStorage {
    private static Map<Integer, Room> rooms;
    private static RoomStorage instance;
    private RoomStorage() {
        rooms = new ConcurrentHashMap<>();
    }

    public static synchronized RoomStorage getInstance() {
        if (instance == null) {
            instance = new RoomStorage();
        }
        return instance;
    }

    public Map<Integer, Room> getRooms() {
        return rooms;
    }

    public void setRoom(Room room) {
        rooms.put(room.getRoomId(), room);
    }
}
