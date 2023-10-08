import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
} from "@chakra-ui/react";

type JoinRoomProps = {
  handleJoinRoom: (username: string) => void;
};

export default function JoinRoom({ handleJoinRoom }: JoinRoomProps) {
  const [username, setUsername] = useState("");
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  return (
    <Stack direction="column" mb={6} flexWrap="wrap" spacing={4}>
      <Heading>Join Room</Heading>
      <FormControl isRequired>
        <FormLabel pl={2}>Enter a username</FormLabel>
        <Input
          placeholder="username"
          autoComplete="off"
          value={username}
          onChange={handleUsernameChange}
        />
      </FormControl>
      <Button alignSelf="stretch" onClick={() => handleJoinRoom(username)}>
        Enter room
      </Button>
    </Stack>
  );
}
