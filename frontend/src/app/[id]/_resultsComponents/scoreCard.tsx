import React from "react";
import {
  Card,
  CardBody,
  Flex,
  Box,
  Text,
  Badge,
  Stack,
} from "@chakra-ui/react";

type ScoreCardProps = {
  name: string;
  prediction: number;
  score: number;
  addedScore: number;
};

type AddedScoreMapping = {
  [key: number]: string;
}

const predictionMapping = ["None", "Some", "Most"];
const predictionColorMapping = ["yellow", "orange", "red"];
const addedScoreColorMapping: AddedScoreMapping = { 0: "red", 1: "yellow", 3: "green" };

export default function ScoreCard({
  name,
  prediction,
  score,
  addedScore,
}: ScoreCardProps) {
  return (
    <Card width="100%">
      <Flex px={4} py={2}>
        <Text fontWeight="bold" flexGrow={1}>
          {name}
          <Badge ml="1" colorScheme={predictionColorMapping[prediction]} variant="outline">
            {predictionMapping[prediction]}
          </Badge>
        </Text>

        <Box>
          <Badge mr="2" colorScheme={addedScoreColorMapping[addedScore]} variant="solid">
            +{addedScore}
          </Badge>
            {score}
        </Box>
      </Flex>
    </Card>
  );
}
