"use client";
import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

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
    handleAddPlayer,
    handleRemovePlayer,
    handlePredictionSelect,
    handleJoinRoom,
    handleNextQuestion,
    handleVote,
    handleShowResults
  } = useRoomState();

  return (
    <Box px={4}>
      {
        roomState == null ? null : 
        currentPlayer == null ?
        <JoinRoom
          handleJoinRoom={handleJoinRoom}
        ></JoinRoom>
        :
        roomState.status == "WAITING" ? <WaitingRoom roomState={roomState} currentPlayer={currentPlayer} handleStartGame={handleNextQuestion}/>
        : roomState.status == "QUESTION_RESULTS" ? (
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
        ) : roomState.status == "QUESTION_IN_PROGRESS" || roomState.status == "QUESTION_COMPLETED" ?
        (
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
        ) : null
      }
    </Box>
    
  );
}
