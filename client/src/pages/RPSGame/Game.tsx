import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Grow from "@mui/material/Grow"
import Player from "./Player"
import { Container, Alert } from "../../components"
import { RPSGameModeOptions } from "../../@types/enums"
import useSocketIO from "../../hooks/useSocketIO"

export default function Home() {
  const { state }: any = useLocation()
  const { isOffline, socket } = useSocketIO()
  const push = useNavigate()
  React.useEffect(() => {
    if (Object.values(RPSGameModeOptions).indexOf(state?.mode) === -1) {
      alert("Invalid game mode, try to select a correct one from the main page!")
      push("/")
    }
  }, [push, state])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: "30px", height: "100%" }}>
      <Container sx={{ flexGrow: 1, justifyContent: "start", pt: "20px" }}>
        <Stack>
          <Grow in={isOffline} mountOnEnter unmountOnExit timeout={1000}>
            <Stack>
              <Alert severity='error' variant='filled' onClose={() => push("/")}>
                Socket connection is offline, please try again!
              </Alert>
            </Stack>
          </Grow>
          <Grow in={!isOffline} mountOnEnter unmountOnExit timeout={1000}>
            <Stack>
              <Player mode={state?.mode} isJoinPlayer={state?.isJoin} socket={socket} />
            </Stack>
          </Grow>
        </Stack>
      </Container>
    </Box>
  )
}
