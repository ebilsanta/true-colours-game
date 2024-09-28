import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { initializeWebSocketConnection } from "../utils/WebSocketService";
import { RoomAPI } from "../api/RoomAPI";

const useRoomState = (): RoomState => {
  const [roomState, setRoomState] = useState<RoomStateSchema | null>(null);
  const [loadingMsg, setLoadingMsg] = useState<string>("Loading room...");
  const [selectedPlayers, setSelectedPlayers] = useState<{
    [key: number]: number;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const urlRoomId = usePathname().substring(1);

  const handleAddPlayer = (playerId: number) => {
    const totalVotes = Object.values(selectedPlayers).reduce(
      (a, b) => a + b,
      0
    );
    if (totalVotes < 2) {
      setSelectedPlayers((prevState) => ({
        ...prevState,
        [playerId]: (prevState[playerId] || 0) + 1,
      }));
    }
  };

  const handleRemovePlayer = (playerId: number) => {
    if (selectedPlayers[playerId] && selectedPlayers[playerId] > 0) {
      setSelectedPlayers((prevState) => ({
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
  };

  const handleJoinRoom = (username: string) => {
    RoomAPI.joinRoom(username, urlRoomId)
      .then((data) => {
        setCurrentPlayer(data.newPlayerId - 1);
        setRoomState(data);
        sessionStorage.setItem(
          "trueColoursData",
          JSON.stringify({ roomId: urlRoomId, playerId: data.newPlayerId - 1 })
        );
      })
      .catch((err) => console.log(err));
  };

  const handleNextQuestion = () => {
    RoomAPI.nextQuestion(urlRoomId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVote = () => {
    setIsSubmitting(true);
    RoomAPI.vote(urlRoomId, currentPlayer!, prediction!, selectedPlayers)
      .then((data) => {
        setSelectedPlayers([]);
        setPrediction(null);
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowResults = () => {
    RoomAPI.showResults(urlRoomId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      .catch((err) => {
        setLoadingMsg("Room not found");
        console.log(err);
      });
  }, []);

  return {
    roomState,
    selectedPlayers,
    isSubmitting,
    prediction,
    currentPlayer,
    loadingMsg,
    handleAddPlayer,
    handleRemovePlayer,
    handlePredictionSelect,
    handleJoinRoom,
    handleNextQuestion,
    handleVote,
    handleShowResults,
  };
};

export default useRoomState;
