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

type PlayerCardProps = {
  name: string;
};


export default function PlayerCard({
  name,
}: PlayerCardProps) {
  return (
    <Card width="100%">
      <CardBody>
        <Text fontWeight="bold" flexGrow={1}>
            {name}
          </Text>
      </CardBody>
    </Card>
  );
}
