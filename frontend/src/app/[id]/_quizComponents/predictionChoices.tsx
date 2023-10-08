import React from "react";
import { Button, Text, HStack } from "@chakra-ui/react";

type PredictionChoicesProps = {
  prediction: number | null;
  predictionChoices: string[];
  handlePredictionSelect: (prediction: number) => void;
};

export default function PredictionChoices({
  prediction,
  predictionChoices,
  handlePredictionSelect,
}: PredictionChoicesProps) {
  return (
    <HStack mb={4}>
      {predictionChoices.map((choice, index) => (
        <Button
          key={choice}
          onClick={() => handlePredictionSelect(index)}
          variant={prediction == index ? "solid" : "outline"}
          width="100%"
          mb={2}
          colorScheme={prediction == index ? "teal" : "gray"}
        >
          <Text>{choice}</Text>
        </Button>
      ))}
    </HStack>
  );
}
