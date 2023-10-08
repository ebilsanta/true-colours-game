import React from "react";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import PlayersAnswered from "./_quizComponents/playersAnswered";
import ActiveForm from "./_quizComponents/activeForm";

type QuizProps = {
  selectedPlayers: { [key: number]: number };
  handleAddPlayer: (player: number) => void;
  handleRemovePlayer: (player: number) => void;
  handlePredictionSelect: (prediction: number) => void;
  handleVote: () => void;
  handleShowResults: () => void;
  prediction: number | null;
  roomState: RoomStateSchema;
  isSubmitting: boolean;
  currentPlayer: number;
};

export default function Quiz({
  roomState,
  selectedPlayers,
  handleAddPlayer,
  handleRemovePlayer,
  prediction,
  handlePredictionSelect,
  handleShowResults,
  isSubmitting,
  currentPlayer,
  handleVote,
}: QuizProps) {
  const predictionChoices = ["None", "Some", "Most"];

  const isValidSelection = () => {
    const numVotes = Object.values(selectedPlayers).reduce(
      (acc, curr) => acc + curr,
      0
    );
    console.log(numVotes == 2 && prediction != null);
    return numVotes == 2 && prediction != null;
  };

  return (
    <Box
      display="flex"
      h="82vh"
      flexDirection="column"
      justifyContent="flex-end"
      position="relative"
    >
      <Heading as="h1" size="md" mb={4}>
        {roomState.questions[roomState.questionNumber]}
      </Heading>

      <PlayersAnswered
        players={roomState.players}
        playersAnswered={roomState.playersAnswered}
      />
      {roomState.playersAnswered[currentPlayer] ? (
        <VStack flex="1">
          <Text>Waiting for players...</Text>
        </VStack>
      ) : (
        <ActiveForm
          currentPlayer={currentPlayer}
          roomState={roomState}
          selectedPlayers={selectedPlayers}
          handleAddPlayer={handleAddPlayer}
          handleRemovePlayer={handleRemovePlayer}
          prediction={prediction}
          predictionChoices={predictionChoices}
          handlePredictionSelect={handlePredictionSelect}
        />
      )}

      <Box>
        {roomState.status == "QUESTION_COMPLETED" &&
        roomState.hostId == currentPlayer ? (
          <Button
            isLoading={isSubmitting}
            loadingText="Submitting"
            width="100%"
            onClick={() => handleShowResults()}
          >
            Show results
          </Button>
        ) : !roomState.playersAnswered[currentPlayer] ? (
          <Button
            isLoading={isSubmitting}
            loadingText="Submitting"
            width="100%"
            isDisabled={!isValidSelection()}
            onClick={() => handleVote()}
          >
            Confirm Choice
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
