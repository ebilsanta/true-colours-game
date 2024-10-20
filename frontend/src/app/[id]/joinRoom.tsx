import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
} from "@chakra-ui/react";

type JoinRoomProps = {
  handleJoinRoom: (username: string) => Promise<void>;
};

export default function JoinRoom({ handleJoinRoom }: JoinRoomProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const handleSubmit = async () => {
    try {
      await handleJoinRoom(username);
    } catch (error: Error | any) {
      setError('Error joining room');
    }
  };

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
      <Button alignSelf="stretch" onClick={handleSubmit}>
        Enter room
      </Button>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Stack>
  );
}
