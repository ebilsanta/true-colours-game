import React from "react"
import {Stack, Tag, TagLabel, TagRightIcon, Spinner} from "@chakra-ui/react"
import {MdCheckCircleOutline} from 'react-icons/md'

type PlayersAnsweredProps = {
  players: Players;
  playersAnswered: PlayersAnswered;
}

export default function PlayersAnswered({players, playersAnswered}: PlayersAnsweredProps) {

  return (
    <Stack direction="row" mb={6} flexWrap="wrap">
        {playersAnswered != null &&
          players != null &&
          Object.keys(playersAnswered).map((id) => (
            <Tag
              key={id}
              colorScheme={playersAnswered[Number(id)] ? "green" : "red"}
              size="md"
              variant="outline"
            >
              <TagLabel>
                {players[Number(id)].name}
              </TagLabel>
                {playersAnswered[Number(id)] 
                  ? <TagRightIcon as={MdCheckCircleOutline}/>
                  : <TagRightIcon boxSize="12px" as={Spinner} size="xs" speed="2s" ml={2}/>
                }
                
            </Tag>
          ))}
      </Stack>
  )
};


