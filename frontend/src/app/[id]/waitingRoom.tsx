import React from "react";
import {
  Card,
  CardBody,
  Button,
  Flex,
  Box,
  Text,
  Badge,
  Stack,
} from "@chakra-ui/react";

import PlayerCard from "./_waitingRoomComponents/playerCard";
import CopyToClipboardButton from "./_waitingRoomComponents/copyToClipboardButton";

type WaitingRoomProps = {
  roomState: RoomStateSchema;
  currentPlayer: number;
  handleStartGame: () => void;
};

export default function WaitingRoom({
  roomState,
  currentPlayer,
  handleStartGame,
}: WaitingRoomProps) {
  const players = roomState.players;

  return (
    <Box
      display="flex"
      h="84vh"
      flexDirection="column"
      justifyContent="flex-end"
      position="relative"
    >
      <Box mb={2}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Waiting Room
        </Text>
        <Text fontSize="md" fontWeight="medium" mb={2}>
          Share the room ID with your friends!
        </Text>
        <CopyToClipboardButton
          text={roomState.roomId}
        />
      </Box>
      <Stack spacing={4} flex="1" overflowY="auto">
        {Object.keys(players).map((playerId) => (
          <PlayerCard key={playerId} name={players[Number(playerId)].name} />
        ))}
      </Stack>
      <Box>
        {roomState.hostId === currentPlayer ? (
          <Button
            loadingText="Starting game"
            width="100%"
            onClick={handleStartGame}
          >
            Start game
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
