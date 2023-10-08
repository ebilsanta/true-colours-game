export {};

declare global {
  type Player = {
    name: string;
  };
  
  type Players = {
    [key: number]: Player;
  };
  
  type PlayersAnswered = {
    [key: number]: boolean;
  };

  type Votes = {
    [key: number]: number[];
  }

  type Predictions = {
    [key: number]: number;
  }

  type Scores = {
    [key: number]: number;
  }
  type AddedScores = {
    [key: number]: number;
  }

  type RoomStateSchema = {
    roomId: string;
    players: Players;
    hostId: number | null;
    newPlayerId: number | null;
    votes: Votes;
    predictions: Predictions;
    playersAnswered: PlayersAnswered;
    scores: Scores;
    addedScores: AddedScores;
    questions: string[];
    questionNumber: number;
    status: string | null;
  };

  type RoomState = {
    roomState: RoomStateSchema | null;
    selectedPlayers: { [key: number]: number };
    isSubmitting: boolean;
    prediction: number | null;
    currentPlayer: number | null;
    handleAddPlayer: (player: number) => void;
    handleRemovePlayer: (player: number) => void;
    handlePredictionSelect: (choice: number) => void;
    handleJoinRoom: (username: string) => void;
    handleNextQuestion: () => void;
    handleVote: () => void;
    handleShowResults: () => void;
  }
}