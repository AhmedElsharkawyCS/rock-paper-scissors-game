import React from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Grow from "@mui/material/Grow"
import { useNavigate } from "react-router-dom"
import { Container, Button, Text } from "../../components"
import { RPSGameModeOptions, StartGameOption } from "../../@types/enums"

export default function Home() {
  const navigate = useNavigate()
  const handleOnClick = (mode: RPSGameModeOptions, startGamePlayerType: StartGameOption) => {
    navigate(`/rps`, { state: { mode, startGamePlayerType } })
  }
  return (
    <Grow in={true} mountOnEnter unmountOnExit timeout={1000}>
      <Box sx={{ display: "flex", flexDirection: "column", p: "30px", height: "100%" }}>
        <Container sx={{ flexGrow: 1, justifyContent: "start", pt: "20px" }}>
          <Text variant='h2' sx={{ fontWeight: 500, pb: "50px" }}>
            Welcome to rocket paper scissors (RPS) game
          </Text>
          <Text variant='h3' sx={{ fontWeight: 300, pb: "10px" }}>
            Which mode do you need to create?
          </Text>
          <Stack spacing={2} direction='row'>
            <Button onClick={() => handleOnClick(RPSGameModeOptions.PLAYER_VS_COMPUTER, StartGameOption.CREATOR)}>
              {RPSGameModeOptions.PLAYER_VS_COMPUTER}
            </Button>
            <Button onClick={() => handleOnClick(RPSGameModeOptions.COMPUTER_VS_COMPUTER, StartGameOption.CREATOR)}>
              {RPSGameModeOptions.COMPUTER_VS_COMPUTER}
            </Button>
          </Stack>
          <Text variant='h3' sx={{ fontWeight: 300, pb: "10px", pt: "50px" }}>
            Do you need to join active game with room ID?
          </Text>
          <Stack spacing={2} direction='row'>
            <Button onClick={() => handleOnClick(RPSGameModeOptions.COMPUTER_VS_COMPUTER, StartGameOption.JOIN)}> {"Continue"}</Button>
          </Stack>
        </Container>
      </Box>
    </Grow>
  )
}
