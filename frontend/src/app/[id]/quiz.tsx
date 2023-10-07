import React from "react";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import VoteCard from "./voteCard";
import ScoreCard from "./scoreCard";
import PlayersAnswered from "./playersAnswered";
import PlayerChoices from "./playerChoices";
import PredictionChoices from "./predictionChoices";

type QuizProps = {
  selectedPlayers: number[];
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

  return (
    <Box
      display="flex"
      h="82vh"
      flexDirection="column"
      justifyContent="flex-end"
      position="relative"
    >
      <Heading as="h1" size="lg" mb={4}>
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
            <PlayerChoices
              currentPlayer={currentPlayer}
              players={roomState.players}
              selectedPlayers={selectedPlayers}
              handleAddPlayer={handleAddPlayer}
              handleRemovePlayer={handleRemovePlayer}
            />
            <Heading size="md" as="h1">
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
            disabled={selectedPlayers.length != 2 || prediction == null}
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
