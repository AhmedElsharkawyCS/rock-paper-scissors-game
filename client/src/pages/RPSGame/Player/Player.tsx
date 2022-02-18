import React from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Grow from "@mui/material/Grow"
import { Socket } from "socket.io-client"
import { Text } from "../../../components"
import { RPSGameValuesOptions, RPSGameModeOptions, GameEvents, StartGameOption } from "../../../@types/enums"
import { IGamePlayer, IGameRoom, IPlayerGameResult } from "../../../@types/interfaces"
import Join from "./Join"
import Start from "./Start"
import Answer from "./Answer"
import Result from "./Result"
import Share from "./Share"

interface PlayerProps {
  mode: RPSGameModeOptions
  socket: Socket
  startGamePlayerType?: StartGameOption
}

export default function Player({ mode, socket, startGamePlayerType }: PlayerProps) {
  const [roomId, setRoomId] = React.useState<string>("")
  const [playerWaiting, setPlayerWaiting] = React.useState<boolean>(true)
  const [gameResult, setGameResult] = React.useState<IPlayerGameResult & { game: IGamePlayer }>()
  const isCreator = startGamePlayerType === StartGameOption.CREATOR
  const isBotGame = mode === RPSGameModeOptions.COMPUTER_VS_COMPUTER

  const onStart = (playerName: string) => {
    const payload = { playerName, mode }
    socket.emit(GameEvents.INIT_GAME, payload)
  }
  const onJoin = (playerName: string, roomId: string) => {
    const payload = { roomId, playerName }
    socket.emit(GameEvents.JOIN_GAME, payload)
  }
  const onSelectAnswer = (answer: RPSGameValuesOptions) => {
    const payload = { roomId, answer }
    //only if the player one is a human
    socket.emit(GameEvents.PLAYER1_ANSWER, payload)
  }

  const listeners = React.useCallback(() => {
    if (!socket) return
    if (isCreator) {
      socket.on(GameEvents.GAME_INITIATED, (payload: IGameRoom) => {
        setRoomId(payload.roomId)
      })
      socket.on(GameEvents.PLAYER2_JOINED, (payload: IGameRoom) => {
        // no need to wait sense the player 2 join the game
        setPlayerWaiting(false)
        // submit answer for player one in case computer vs computer mode
        if (mode === RPSGameModeOptions.COMPUTER_VS_COMPUTER) socket.emit(GameEvents.PLAYER1_ANSWER, { roomId: payload.roomId })
      })
    }
    if (!isCreator) {
      socket.on(GameEvents.PLAYER2_JOINED, (payload: IGameRoom) => {
        setRoomId(payload.roomId)
        // here we will submit answer directly, coz it's a bot (always the
        // second player will be a bot)
        socket.emit(GameEvents.PLAYER2_ANSWER, { roomId: payload.roomId })
        // no need to wait sense the player 2 join the game
        setPlayerWaiting(false)
      })
    }
    // listen on game result
    socket.on(GameEvents.GAME_RESULT, (payload: IPlayerGameResult & { game: IGamePlayer }) => {
      setGameResult(payload)
    })
  }, [socket, mode, isCreator])

  React.useEffect(() => {
    listeners()
    return () => {
      setRoomId("")
      setGameResult(undefined)
    }
  }, [listeners])

  return (
    <Stack>
      {!roomId && (
        <Text variant='h2' sx={{ fontWeight: 500, pb: "40px" }}>
          Game Setup
        </Text>
      )}
      <Box sx={{ minWidth: "300px" }}>
        <Stack spacing={2}>
          <Grow in={!roomId} mountOnEnter unmountOnExit timeout={500}>
            <Stack>
              <Text variant='h6' sx={{ fontWeight: 500, pb: "40px" }}>
                {isCreator ? "Fill the input to start a new game" : "fill the inputs to join the an existing game"}
              </Text>
              {isCreator && <Start onStart={onStart} />}
              {!isCreator && <Join onJoin={onJoin} />}
            </Stack>
          </Grow>
          <Grow in={!!roomId && playerWaiting} mountOnEnter unmountOnExit timeout={500}>
            <Stack>
              <Share roomId={roomId} isWaiting={true} />
            </Stack>
          </Grow>
          <Grow in={!!roomId && !playerWaiting} mountOnEnter unmountOnExit timeout={500}>
            <Stack>
              {isCreator && (
                <Answer
                  playerType={isBotGame ? "bot" : "human"}
                  onSelect={onSelectAnswer}
                  defaultValue={(isBotGame && gameResult?.game.creator?.value) || undefined}
                />
              )}
              {!isCreator && <Answer playerType={"bot"} defaultValue={gameResult?.game.secondPlayer?.value} />}
            </Stack>
          </Grow>
          {gameResult && <Result result={gameResult} />}
        </Stack>
      </Box>
    </Stack>
  )
}
