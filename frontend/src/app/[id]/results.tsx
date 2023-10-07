import React from "react";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import VoteCard from "./voteCard";
import ScoreCard from './scoreCard';

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
  handleNextQuestion
}: ResultsProps) {
  const voteCounts = Object.keys(votes).map((key) => ({
    index: key,
    count: votes[Number(key)].length,
  }));

  voteCounts.sort((a, b) => b.count - a.count);

  const sortedVotePlayers = voteCounts.map((item) => item.index);

  const scoreCounts = Object.keys(votes).map((key) => ({
    index: key,
    count: votes[Number(key)].length,
  }));

  scoreCounts.sort((a, b) => b.count - a.count);

  const sortedScorePlayers = scoreCounts.map((item) => item.index);

  return (
    <Flex direction="column" h="84vh" >
      <Flex overflowY="auto" direction="column" flex="1">
        <Heading as="h3" size="lg" p={2}>
          Votes
        </Heading>
        <VStack
          spacing={2}
          alignItems="flex-start"
        >
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
          Score
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
      
      {
        roomState.hostId == currentPlayer ? (
          <Box position="sticky" bottom="0">
            <Button
              loadingText="Submitting"
              width="100%"
              onClick={() => handleNextQuestion()}
            >
              Show next question
            </Button>
          </Box>
        ) : null
      }
    </Flex>
  );
}
