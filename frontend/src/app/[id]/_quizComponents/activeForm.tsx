import React from "react";
import { Heading, Text } from "@chakra-ui/react";
import PlayerChoices from "./playerChoices";
import PredictionChoices from "./predictionChoices";

type ActiveFormProps = {
  currentPlayer: number;
  roomState: any;
  selectedPlayers: { [key: number]: number };
  handleAddPlayer: (player: number) => void;
  handleRemovePlayer: (player: number) => void;
  prediction: number | null;
  predictionChoices: string[];
  handlePredictionSelect: (prediction: number) => void;
};

const ActiveForm = ({
  currentPlayer,
  roomState,
  selectedPlayers,
  handleAddPlayer,
  handleRemovePlayer,
  prediction,
  predictionChoices,
  handlePredictionSelect,
}: ActiveFormProps) => {
  return (
    <>
      <Heading size="lg" as="h1">
        Your votes
      </Heading>
      <Text fontSize="sm" pb={4}>
        Vote 2 people (could be the same person)
      </Text>
      <PlayerChoices
        currentPlayer={currentPlayer}
        players={roomState.players}
        selectedPlayers={selectedPlayers}
        handleAddPlayer={handleAddPlayer}
        handleRemovePlayer={handleRemovePlayer}
      />
      <Heading size="lg" as="h1">
        Your prediction
      </Heading>
      <Text fontSize="sm" pb={4}>
        How many votes do you think you&apos;ll get?
      </Text>
      <PredictionChoices
        prediction={prediction}
        predictionChoices={predictionChoices}
        handlePredictionSelect={handlePredictionSelect}
      />
    </>
  );
};

export default ActiveForm;
