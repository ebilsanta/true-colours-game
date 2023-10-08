import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { initializeWebSocketConnection } from "../utils/WebSocketService";
import { RoomAPI } from "../api/RoomAPI";

const useRoomState = (): RoomState => {
  const [roomState, setRoomState] = useState<RoomStateSchema|null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<{ [key: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number|null>(null);
  const urlRoomId = usePathname().substring(1);

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
    RoomAPI.joinRoom(username, urlRoomId)
    .then((data) => {
      setCurrentPlayer(data.newPlayerId - 1); 
      setRoomState(data);
    })
    .catch(err => console.log(err));
    // fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room/join`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ player: {name: username}, roomId:  urlRoomId.substring(1) }),
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   setCurrentPlayer(data.newPlayerId - 1); 
    //   setRoomState(data);
    // })
  }

  const handleNextQuestion = () => {
    RoomAPI.nextQuestion(urlRoomId)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {console.log(err)})

    // fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room/next-question`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({roomId:  urlRoomId }),
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);
    // })
  }

  const handleVote = () => {
    setIsSubmitting(true);
    // const votes = []
    // for (const [key, value] of Object.entries(selectedPlayers)) {
    //   for (let i = 0; i < value; i++) {
    //     votes.push(key);
    //   }
    // }
    RoomAPI.vote(urlRoomId, currentPlayer!, prediction!, selectedPlayers)
    .then((data) => {
      setSelectedPlayers([]);
      setPrediction(null);
      setIsSubmitting(false);
    })
    .catch((err) => {console.log(err)});

    // fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room/answer`, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     roomId:  urlRoomId.substring(1), 
    //     playerId: currentPlayer, 
    //     prediction: prediction,
    //     votedPlayer1Id: votes[0], 
    //     votedPlayer2Id: votes[1]
    //   }),
    // })
    // .then(() => {
    //   setSelectedPlayers([]);
    //   setPrediction(null);
    //   setIsSubmitting(false);
    // })
  }

  const handleShowResults = () => {
    RoomAPI.showResults(urlRoomId)
    .then((data) => {console.log(data)})
    .catch((err) => {console.log(err)});
    // fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room/question-results`, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     roomId:  urlRoomId.substring(1), 
    //   }),
    // })
    // .then((res) => res.json())
    // .then((data) => {console.log(data)})
  }


  useEffect(() => {
    // set current player if they have already joined the room previously
    const trueColoursData = sessionStorage.getItem("trueColoursData");
    
    if (trueColoursData) {
      const { roomId, playerId } = JSON.parse(trueColoursData);
      if (urlRoomId == roomId) {
        setCurrentPlayer(playerId);
      }
    } 

    // fetch room data and initialize websocket connection
    RoomAPI.getRoomData(urlRoomId)
    .then((data) => {
      console.log(data);
      setRoomState(data);
      initializeWebSocketConnection(data.roomId, setRoomState);
    })
    // fetch(`http://${process.env.NEXT_PUBLIC_BASE_API_URL}:8080/room${urlRoomId}`, {
    //   method: "GET"
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data)
    //   setRoomState(data); 
    //   initializeWebSocketConnection(data.roomId, setRoomState);
      
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
