"use client";
import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

import useRoomState from "./useRoom";
import Results from "./results";
import Quiz from "./quiz";
import JoinRoom from "./joinRoom";
import WaitingRoom from "./waitingRoom";

export default function Page() {
  const {
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
  } = useRoomState();

  if (roomState == null) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Heading textAlign="center" size="lg">
          {loadingMsg}
        </Heading>
      </Flex>
    );
  }

  return (
    <Box px={4} maxW="2xl" flexGrow="1">
      {currentPlayer == null ? (
        <JoinRoom handleJoinRoom={handleJoinRoom} />
      ) : roomState.status == "WAITING" ? (
        <WaitingRoom
          roomState={roomState}
          currentPlayer={currentPlayer}
          handleStartGame={handleNextQuestion}
        />
      ) : ["QUESTION_IN_PROGRESS", "QUESTION_COMPLETED"].includes(
          roomState.status!
        ) ? (
        <Quiz
          currentPlayer={currentPlayer}
          roomState={roomState}
          selectedPlayers={selectedPlayers}
          handleAddPlayer={handleAddPlayer}
          handleRemovePlayer={handleRemovePlayer}
          handlePredictionSelect={handlePredictionSelect}
          handleShowResults={handleShowResults}
          handleVote={handleVote}
          prediction={prediction}
          isSubmitting={isSubmitting}
        />
      ) : roomState.status == "QUESTION_RESULTS" ? (
        <Results
          addedScores={roomState.addedScores}
          players={roomState.players}
          votes={roomState.votes}
          predictions={roomState.predictions}
          scores={roomState.scores}
          roomState={roomState}
          currentPlayer={currentPlayer}
          handleNextQuestion={handleNextQuestion}
        />
      ) : null}
    </Box>
  );
}
