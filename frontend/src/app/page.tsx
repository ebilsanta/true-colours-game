'use client';
import React, {useState} from "react"
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
  Divider
} from '@chakra-ui/react'

import { useRouter } from 'next/navigation'

export default function Home() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
  const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => setRoomId(event.target.value);
  const router = useRouter();
  const[err, setErr] = useState("");


  const createRoom = (username: string) => {
    setIsLoading(true);
    console.log(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room/create`)
    fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room/create`,  {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: username})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      sessionStorage.setItem("trueColoursData", JSON.stringify({roomId: data.roomId, playerId: 0}))
      router.push(`${data.roomId}`)
      setIsLoading(false);
    })
    .catch(err => {setErr(JSON.stringify(err))})
  }

  const navigateToRoom = (roomId: string) => router.push(`${roomId}`)

  return (
    <Box px={4}>
      <Stack direction="column" mb={6} flexWrap="wrap" spacing={6}>
        <Heading textAlign="center">
          True Colours
        </Heading>
        <Heading textAlign="center" size="md">
          Create a Room {err}
        </Heading>
        <FormControl>
          <FormLabel pl={2}>Enter a username</FormLabel>
          <Input placeholder="Username" value={username} onChange={handleUsernameChange}/>
        </FormControl>
        <Button alignSelf="stretch" onClick={() => createRoom(username)} isLoading={isLoading}>Create room</Button>
        <Box position='relative' padding='10'>
          <Divider />
          <AbsoluteCenter px='4'>
            Or
          </AbsoluteCenter>
        </Box>
        <Heading textAlign="center" size="md">
          Join a Room
        </Heading>
        <FormControl>
          <FormLabel pl={2}>Enter Room ID</FormLabel>
          <Input placeholder="Room ID" value={roomId} onChange={handleRoomIdChange}/>
        </FormControl>
        <Button alignSelf="stretch" onClick={() => navigateToRoom(roomId)} isLoading={isLoading}>Join room</Button>
      </Stack>
    </Box>
    
  )
};


