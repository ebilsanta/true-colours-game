"use client";
import React, { useState } from "react";
import {
  AbsoluteCenter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";

import { RoomAPI } from "./api/RoomAPI";

export default function Home() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRoomId(event.target.value);
  const router = useRouter();

  const createRoom = (username: string) => {
    setIsLoading(true);
    RoomAPI.createRoom(username)
      .then((data) => {
        console.log(data);
        sessionStorage.setItem(
          "trueColoursData",
          JSON.stringify({ roomId: data.roomId, playerId: 0 })
        );
        router.push(`${data.roomId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigateToRoom = (roomId: string) => router.push(`${roomId}`);

  return (
    <Box px={4} maxW="2xl">
      <Stack direction="column" mb={6} flexWrap="wrap" spacing={4}>
        <Heading textAlign="center">True Colours</Heading>
        <Heading textAlign="center" size="md">
          Create a Room
        </Heading>
        <FormControl>
          <FormLabel pl={2}>Enter a username</FormLabel>
          <Input
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="off"
          />
        </FormControl>
        <Button
          alignSelf="stretch"
          onClick={() => createRoom(username)}
          isLoading={isLoading}
        >
          Create room
        </Button>
        <Box position="relative" padding="4">
          <Divider />
          <AbsoluteCenter px="4">Or</AbsoluteCenter>
        </Box>
        <Heading textAlign="center" size="md">
          Join a Room
        </Heading>
        <FormControl>
          <FormLabel pl={2}>Enter Room ID</FormLabel>
          <Input
            placeholder="Room ID"
            value={roomId}
            onChange={handleRoomIdChange}
            autoComplete="off"
          />
        </FormControl>
        <Button
          alignSelf="stretch"
          onClick={() => navigateToRoom(roomId)}
          isLoading={isLoading}
        >
          Join room
        </Button>
        <Divider />
        <Heading textAlign="center" size="md">
          Instructions
        </Heading>
        <Text>
          Vote for the <strong>two</strong> players you think are most likely to
          do the thing in the question.
        </Text>
        <Text>
          If they're really likely, you can give them <strong>both</strong>{" "}
          votes.
        </Text>
        <Text>
          Then, predict how many votes you will get from others, either{" "}
          <strong>none</strong>, <strong>some</strong>, or <strong>most</strong>{" "}
          votes.
        </Text>
        <Text>
          You get <strong>3</strong> points if you correctly predict you'll get{" "}
          <strong>none</strong> or <strong>most</strong> votes.
        </Text>
        <Text>
          You get <strong>1</strong> point if you correctly predict you'll get{" "}
          <strong>some</strong> votes.
        </Text>
        <Text>And none if you predicted wrongly...</Text>
      </Stack>
    </Box>
  );
}
