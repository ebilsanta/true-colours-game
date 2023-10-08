import React from "react"
import { Card, CardBody, Flex, Box, Text, Badge, Stack,  } from "@chakra-ui/react"

type ResultsCardProps = {
  name: string, 
  voters: string[]
}

export default function VoteCard({name, voters}: ResultsCardProps) {
  return (
    <Card width="100%" minHeight={14}>
      <CardBody my={0} py={2}>
        <Text fontWeight='bold'>
          {name}
          <Badge ml='1' colorScheme='teal'>
            {voters.length}
          </Badge>
        </Text>
        <Stack direction="row"flexWrap="wrap">
          {
            voters.map((voter, i) => (
              <Badge
                key={i}
                size="xs"
              >
                {voter}
              </Badge>
            ))}
        </Stack>
      </CardBody>
    </Card>
  )
};


