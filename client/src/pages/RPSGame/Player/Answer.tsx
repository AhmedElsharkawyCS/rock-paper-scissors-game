import React from "react"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import { keyframes } from "@emotion/react"
import { RPSGameValuesOptions } from "../../../@types/enums"
import { Button, Text } from "../../../components"

interface AnswerProps {
  playerType: "bot" | "human"
  onSelect: (val: RPSGameValuesOptions) => void
  defaultValue?: RPSGameValuesOptions
}

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`
const options = [
  {
    value: RPSGameValuesOptions.ROCK,
    src: "https://img.icons8.com/color/96/000000/hand-rock-skin-type-1.png",
  },
  {
    value: RPSGameValuesOptions.PAPER,
    src: "https://img.icons8.com/color/96/000000/hand.png",
  },
  {
    value: RPSGameValuesOptions.SCISSORS,
    src: "https://img.icons8.com/color/96/000000/hand-scissors--v1.png",
  },
]
const selectedSx = { border: "2px solid #35ab32", animation: `${bounce} 1s ease` }

export default function Answer({ playerType, onSelect, defaultValue }: AnswerProps) {
  const [itemIndex, setItemIndex] = React.useState<number>()
  const handleOnChoice = (idx: number) => {
    setItemIndex(idx)
  }
  const onSubmit = () => {
    if (!itemIndex && itemIndex !== 0) return alert("Please select a valid option first")
    onSelect(options[itemIndex].value)
  }
  React.useEffect(() => {
    if (defaultValue && playerType === "bot") {
      const idx = options.findIndex((option) => option.value === defaultValue)
      setItemIndex(idx)
    }
  }, [defaultValue, playerType])

  return (
    <Box>
      <Text sx={{ pb: "20px" }}>{playerType === "human" ? "Select once of these and submit" : "Machine is playing..."}</Text>
      <Stack direction='row' spacing={4}>
        {options.map((item, idx) => {
          return (
            <Avatar
              onClick={() => playerType === "human" && handleOnChoice(idx)}
              key={idx}
              sx={{ width: 70, height: 70, cursor: playerType === "human" ? "pointer" : "auto", ...(itemIndex === idx && selectedSx) }}
              alt={item.value}
              src={item.src}
            />
          )
        })}
      </Stack>
      {playerType === "human" && (
        <Box sx={{ mt: "30px", display: "flex", justifyContent: "center" }}>
          <Button color='success' disabled={itemIndex === undefined} onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      )}
    </Box>
  )
}
