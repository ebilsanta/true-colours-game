import React from "react";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import VoteCard from "./_resultsComponents/voteCard";
import ScoreCard from "./_resultsComponents/scoreCard";
import PlayersAnswered from "./_quizComponents/playersAnswered";
import PlayerChoices from "./_quizComponents/playerChoices";
import PredictionChoices from "./_quizComponents/predictionChoices";

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

  const canSubmit = () => {
    const numVotes = Object.values(selectedPlayers).reduce((acc, curr) => acc + curr, 0);
    return numVotes == 2 && prediction != null;
  }

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
      {
        roomState.playersAnswered[currentPlayer] ? 
        (<VStack flex="1">
          <Text>Waiting for players...</Text>
        </VStack>)
        : (<>
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
              How many votes do you think you'll get?
            </Text>
            <PredictionChoices
              prediction={prediction}
              predictionChoices={predictionChoices}
              handlePredictionSelect={handlePredictionSelect}
            />
        </>)
      }
      
      <Box >
        { roomState.status == "QUESTION_COMPLETED" ?
            roomState.hostId == currentPlayer ? (
              <Button
                isLoading={isSubmitting}
                loadingText="Submitting"
                width="100%"
                onClick={() => handleShowResults()}
              >
                Show results
              </Button>
            ) : null
        : roomState.playersAnswered[currentPlayer] ? 
              null
        :(
          <Button
            isLoading={isSubmitting}
            loadingText="Submitting"
            width="100%"
            disabled={!canSubmit}
            onClick={() => handleVote()}
          >
            Confirm Choice
          </Button>
        )
        } 
      </Box>
    </Box>
  );
}
