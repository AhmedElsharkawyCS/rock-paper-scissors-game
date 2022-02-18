import React from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Grow from "@mui/material/Grow"
import { Socket } from "socket.io-client"
import { Button, Text } from "../../../components"
import { RPSGameValuesOptions, RPSGameModeOptions, GameEvents } from "../../../@types/enums"
import { IGamePlayer, IGameRoom, IPlayerGameResult } from "../../../@types/interfaces"
import Join from "./Join"
import Start from "./Start"
import Answer from "./Answer"
import Result from "./Result"
import Share from "./Share"

interface PlayerProps {
  mode: RPSGameModeOptions
  socket: Socket
  isJoinPlayer?: boolean
}
enum StartGameOption {
  CREATOR = "creator",
  JOIN = "join",
}
export default function Player({ mode, socket, isJoinPlayer }: PlayerProps) {
  const [startType, setStartType] = React.useState<StartGameOption>(isJoinPlayer ? StartGameOption.JOIN : StartGameOption.CREATOR)
  const [roomId, setRoomId] = React.useState<string>("")
  const [isWaitingAnother, setIsWaitingAnother] = React.useState<boolean>(true)
  const [gameResult, setGameResult] = React.useState<IPlayerGameResult & { game: IGamePlayer }>()

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
  const idCreator = StartGameOption.CREATOR === startType
  const isHuman = idCreator && mode === RPSGameModeOptions.PLAYER_VS_COMPUTER
  const handleOnPlayerType = () => {
    if (idCreator) setStartType(StartGameOption.JOIN)
    else setStartType(StartGameOption.CREATOR)
  }

  const listeners = React.useCallback(() => {
    if (!socket) return
    if (startType === StartGameOption.CREATOR) {
      socket.on(GameEvents.GAME_INITIATED, (payload: IGameRoom) => {
        setRoomId(payload.roomId)
      })
      socket.on(GameEvents.PLAYER2_JOINED, (payload: IGameRoom) => {
        setIsWaitingAnother(false)
      })
    }
    if (startType === StartGameOption.JOIN) {
      socket.on(GameEvents.PLAYER2_JOINED, ({ roomId, mode: setupMode }: IGameRoom) => {
        setRoomId(roomId)
        // here we will submit answer directly, coz it's a bot (always the
        // second player will be a bot)
        socket.emit(GameEvents.PLAYER2_ANSWER, { roomId })
        // submit answer for player one in case computer vs computer mode
        if (mode == RPSGameModeOptions.COMPUTER_VS_COMPUTER && setupMode === RPSGameModeOptions.COMPUTER_VS_COMPUTER) {
          socket.emit(GameEvents.PLAYER1_ANSWER, { roomId })
        }
        setIsWaitingAnother(false)
      })
    }
    // listen on game result
    socket.on(GameEvents.GAME_RESULT, (payload: IPlayerGameResult & { game: IGamePlayer }) => {
      setGameResult(payload)
    })
  }, [socket, startType])

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
              <Button onClick={handleOnPlayerType} color='info' sx={{ mb: "20px" }}>
                {idCreator ? "Join Game By Room ID" : "Start New Game"}
              </Button>
              {idCreator && <Start onStart={onStart} />}
              {!idCreator && <Join onJoin={onJoin} />}
            </Stack>
          </Grow>
          <Grow in={!!roomId && isWaitingAnother} mountOnEnter unmountOnExit timeout={500}>
            <Stack>
              <Share roomId={roomId} isWaiting={true} />
            </Stack>
          </Grow>
          <Grow in={!!roomId && !isWaitingAnother} mountOnEnter unmountOnExit timeout={500}>
            <Stack>
              <Answer playerType={isHuman ? "human" : "bot"} onSelect={onSelectAnswer} defaultValue={gameResult?.game.secondPlayer?.value} />
            </Stack>
          </Grow>
          {gameResult && <Result result={gameResult} />}
        </Stack>
      </Box>
    </Stack>
  )
}
