import React from "react"
import {Box, Button, Text, VStack, HStack, Stack, IconButton } from "@chakra-ui/react"
import { AddIcon, MinusIcon } from '@chakra-ui/icons';


type PlayersChoicesProps = {
  players: Players | null;
  currentPlayer: number;
  selectedPlayers: number[];
  handleAddPlayer: (player: number) => void;
  handleRemovePlayer: (player: number) => void;
}

export default function PlayerChoices({players, selectedPlayers, currentPlayer, handleAddPlayer, handleRemovePlayer}: PlayersChoicesProps) {
  return (
    <VStack spacing={4} flex="1" overflowY="auto">
  {players != null &&
    Object.keys(players).map((id) => {
      const playerId = Number(id);

      if (playerId !== currentPlayer) {
        return (
          <Stack key={id} spacing={4} direction="row" align="center" justify="space-between" width="100%" px={2}>
            <Text>{players[playerId].name}</Text>
            <HStack>
              <IconButton
                aria-label="Add Player"
                icon={<AddIcon />}
                onClick={() => handleAddPlayer(playerId)}
              />
              <Text>{selectedPlayers[playerId] || 0}</Text>
              <IconButton
                aria-label="Remove Player"
                icon={<MinusIcon />}
                onClick={() => handleRemovePlayer(playerId)}
              />  
            </HStack>
          </Stack>
        );
      }

      return null;
    })}
</VStack>

  )
};


