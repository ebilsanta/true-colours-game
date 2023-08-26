package com.truecoloursgame.truecoloursgame;
import lombok.Data;

import java.util.ArrayList;
@Data
public class Room {
    private String roomId;
    private ArrayList<Player> players;
    private int[][] votes;
    private int[] predictions;
    private String[] questions;
}
