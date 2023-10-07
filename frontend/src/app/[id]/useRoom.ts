import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { initializeWebSocketConnection, disconnectWebSocketConnection } from "../utils/WebSocketService";

const useRoomState = (): RoomState => {
  const [roomState, setRoomState] = useState<RoomStateSchema|null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number|null>(null);
  const urlRoomId = usePathname();

  // const handlePlayerSelect = (player: number) => {
  //   if (selectedPlayers.includes(player)) {
  //     setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
  //   } else if (selectedPlayers.length < 2) {
  //     setSelectedPlayers([...selectedPlayers, player]);
  //   }
  // };

  const handleAddPlayer = (playerId: number) => {
    const totalVotes = Object.values(selectedPlayers).reduce((a, b) => a + b, 0);
    if (totalVotes < 2 && !selectedPlayers[playerId] || selectedPlayers[playerId] < 2) {
      setSelectedPlayers(prevState => ({
        ...prevState,
        [playerId]: (prevState[playerId] || 0) + 1,
      }));
    }
  };
  
  const handleRemovePlayer = (playerId: number) => {
    if (selectedPlayers[playerId] && selectedPlayers[playerId] > 0) {
      setSelectedPlayers(prevState => ({
        ...prevState,
        [playerId]: prevState[playerId] - 1,
      }));
    }
  };

  const handlePredictionSelect = (choice: number) => {
    if (prediction === choice) {
      setPrediction(null);
    } else {
      setPrediction(choice);
    }
  }


  const handleJoinRoom = (username: string) => {
    fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player: {name: username}, roomId:  urlRoomId.substring(1) }),
    })
    .then((res) => res.json())
    .then((data) => {
      setCurrentPlayer(data.newPlayerId - 1); 
      setRoomState(data);
    })
  }

  const handleNextQuestion = () => {
    fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room/next-question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({roomId:  urlRoomId.substring(1) }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
  }

  const handleVote = () => {
    const votes = []
    for (const [key, value] of Object.entries(selectedPlayers)) {
      for (let i = 0; i < value; i++) {
        votes.push(key);
      }
    }

    fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room/answer`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId:  urlRoomId.substring(1), 
        playerId: currentPlayer, 
        prediction: prediction,
        votedPlayer1Id: votes[0], 
        votedPlayer2Id: votes[1]
      }),
    })
    .then(() => {
      setSelectedPlayers([]);
      setPrediction(null);
    })
  }

  const handleShowResults = () => {
    fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room/question-results`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId:  urlRoomId.substring(1), 
      }),
    })
    .then((res) => res.json())
    .then((data) => {console.log(data)})
  }


  useEffect(() => {
    const trueColoursData = sessionStorage.getItem("trueColoursData");
    
    if (trueColoursData) {
      const { roomId, playerId } = JSON.parse(trueColoursData);
      if (urlRoomId.substring(1) == roomId) {
        setCurrentPlayer(playerId);
      }
    } 

    fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room${urlRoomId}`, {
      method: "GET"
    })
    .then((res) => res.json())
    .then((data) => {
      setRoomState(data); 
      initializeWebSocketConnection(data.roomId, setRoomState);
      console.log(data)
    })

    // fetch("http://localhost:8080/room/join", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ player: {name: "player" + Math.random().toFixed(2)}, roomId:  "0f60f2e1-ea86-4770-8684-1f3e2a9e07dc"}),
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data)
    //   setRoomState(data);
    // })
  }, []);

  return {
    roomState,
    selectedPlayers,
    isSubmitting,
    prediction,
    currentPlayer,
    handleAddPlayer,
    handleRemovePlayer,
    handlePredictionSelect,
    handleJoinRoom,
    handleNextQuestion,
    handleVote,
    handleShowResults
  };
};

export default useRoomState;
