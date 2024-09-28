import React from "react";
import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import VoteCard from "./_resultsComponents/voteCard";
import ScoreCard from "./_resultsComponents/scoreCard";

type ResultsProps = {
  players: Players;
  votes: Votes;
  predictions: Predictions;
  scores: Scores;
  addedScores: AddedScores;
  roomState: RoomStateSchema;
  currentPlayer: number;
  handleNextQuestion: () => void;
};

export default function Results({
  players,
  votes,
  predictions,
  scores,
  addedScores,
  roomState,
  currentPlayer,
  handleNextQuestion,
}: ResultsProps) {
  const getPlayersSortedByVotes = () => {
    const voteCounts = Object.keys(votes).map((key) => ({
      index: key,
      count: votes[Number(key)].length,
    }));

    voteCounts.sort((a, b) => b.count - a.count);

    return voteCounts.map((item) => item.index);
  };

  const getPlayersSortedByScore = () => {
    const scoreCounts = Object.keys(scores).map((key) => ({
      index: key,
      count: scores[Number(key)],
    }));

    scoreCounts.sort((a, b) => b.count - a.count);

    return scoreCounts.map((item) => item.index);
  };

  const sortedVotePlayers = getPlayersSortedByVotes();
  const sortedScorePlayers = getPlayersSortedByScore();

  return (
    <Flex direction="column" h="84vh">
      <Flex overflowY="auto" direction="column" flex="1">
        <Heading as="h1" size="md" mb={4}>
          {roomState.questions[roomState.questionNumber]}
        </Heading>
        <Heading as="h3" size="lg" p={2}>
          Votes
        </Heading>
        <VStack spacing={2} alignItems="flex-start">
          {votes != null &&
            sortedVotePlayers.map((id) => {
              const voters = [];
              for (const playerId of votes[Number(id)]) {
                voters.push(players[Number(playerId)].name);
              }
              return (
                <VoteCard
                  key={id}
                  name={players[Number(id)].name}
                  voters={voters}
                />
              );
            })}
        </VStack>
        <Heading as="h3" size="lg" p={2}>
          Current Scores
        </Heading>
        <VStack flex="1">
          {sortedScorePlayers.map((id) => (
            <ScoreCard
              key={id}
              name={players[Number(id)].name}
              score={scores[Number(id)]}
              prediction={predictions[Number(id)]}
              addedScore={addedScores[Number(id)]}
            />
          ))}
        </VStack>
      </Flex>

      {roomState.hostId == currentPlayer ? (
        <Box position="sticky" bottom="0">
          <Button
            loadingText="Submitting"
            width="100%"
            onClick={() => handleNextQuestion()}
          >
            Show next question
          </Button>
        </Box>
      ) : null}
    </Flex>
  );
}
