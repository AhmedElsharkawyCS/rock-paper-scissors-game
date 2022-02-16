import http from "http"
import { Server } from "socket.io"
import { io as Client, Socket } from "socket.io-client"
import { GameErrorCodes, GameEvents, RPSGameModeOptions, RPSGameValuesOptions } from "../../@types/enums"
import RPSGame from "../../libs/RPSGame"
import IOGameEvents from "../IOGameEvents"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe("events/IOGameEvents", () => {
  let io: Server
  let clientSocket: Socket
  let ioGameEvents: IOGameEvents

  beforeAll((done) => {
    const PORT = 3000
    const httpServer = http.createServer()
    io = new Server(httpServer)
    const rpsGame = new RPSGame()
    ioGameEvents = new IOGameEvents(io, rpsGame)
    httpServer.listen(PORT, () => {
      clientSocket = Client(`http://localhost:${PORT}`)
      clientSocket.on("connect", done)
    })
  })
  afterAll(() => {
    io.close()
    clientSocket.close()
  })
  it("reruns an error if game mode is invalid", (done) => {
    const creatorPayload = { playerName: "test", mode: "bla bla" }
    clientSocket.emit(GameEvents.INIT_GAME, creatorPayload)
    clientSocket.on(GameEvents.GAME_ERROR, ({ message, code }) => {
      expect(code).toBe(GameErrorCodes.INVALID_DATA)
      expect(message).toBeTruthy()
      done()
    })
  })

  it("reruns an error if creator/player name is invalid", (done) => {
    const creatorPayload = { playerName: "", mode: RPSGameModeOptions.PLAYER_VS_COMPUTER }
    clientSocket.emit(GameEvents.INIT_GAME, creatorPayload)
    clientSocket.on(GameEvents.GAME_ERROR, ({ message, code }) => {
      expect(code).toBe(GameErrorCodes.INVALID_DATA)
      expect(message).toBeTruthy()
      done()
    })
  })

  it("init RPS game", (done) => {
    const creatorPayload = { playerName: "ahmed", mode: RPSGameModeOptions.PLAYER_VS_COMPUTER }
    clientSocket.emit(GameEvents.INIT_GAME, creatorPayload)
    clientSocket.on(GameEvents.GAME_INITIATED, (payload) => {
      expect(payload.roomId).toBe(ioGameEvents.gameRomeId)
      const gameObject = ioGameEvents.gamePlayers[ioGameEvents.gameRomeId]
      expect(gameObject).toBeTruthy()
      expect(gameObject.creator.name).toBe(creatorPayload.playerName)
      expect(gameObject.creator.value).toBe("")
      expect(ioGameEvents.gameMode).toBe(creatorPayload.mode)
      expect(payload.gameInfo.creator.name).toBe(creatorPayload.playerName)
      expect(payload.gameInfo.creator.name).toBe(payload.gameInfo.creator.name)
      done()
    })
  })

  it("reruns an error if the second player name is invalid", (done) => {
    const secondPlayer = { playerName: "", roomId: ioGameEvents.gameRomeId }
    clientSocket.emit(GameEvents.JOIN_GAME, secondPlayer)
    clientSocket.on(GameEvents.GAME_ERROR, ({ message, code }) => {
      expect(code).toBe(GameErrorCodes.INVALID_DATA)
      expect(message).toBeTruthy()
      done()
    })
  })

  it("join RPS game", (done) => {
    const secondPlayer = { playerName: "moh", roomId: ioGameEvents.gameRomeId }
    clientSocket.emit(GameEvents.JOIN_GAME, secondPlayer)
    clientSocket.on(GameEvents.PLAYER1_JOINED, ({ roomId, gameInfo }) => {
      expect(roomId).toBe(ioGameEvents.gameRomeId)
      expect(gameInfo.secondPlayer.name).toBe(secondPlayer.playerName)
      expect(gameInfo.secondPlayer.value).toBe("")
    })
    clientSocket.on(GameEvents.PLAYER2_JOINED, ({ roomId, gameInfo }) => {
      expect(roomId).toBe(ioGameEvents.gameRomeId)
      expect(gameInfo.secondPlayer.name).toBe(secondPlayer.playerName)
      expect(gameInfo.secondPlayer.value).toBe("")
      done()
    })
  })

  it("reruns an error if we pass an invalid answer", (done) => {
    const playerOne = { answer: "", roomId: ioGameEvents.gameRomeId }
    clientSocket.emit(GameEvents.PLAYER1_ANSWER, playerOne)
    clientSocket.on(GameEvents.GAME_ERROR, ({ message, code }) => {
      expect(code).toBe(GameErrorCodes.INVALID_DATA)
      expect(message).toBeTruthy()
      done()
    })
  })

  it("players play RPS game", (done) => {
    const playerOne = { answer: RPSGameValuesOptions.SCISSORS, roomId: ioGameEvents.gameRomeId }
    clientSocket.emit(GameEvents.PLAYER1_ANSWER, playerOne)
    const playerTwo = { roomId: ioGameEvents.gameRomeId }
    clientSocket.emit(GameEvents.PLAYER2_ANSWER, playerTwo)
    clientSocket.on(GameEvents.GAME_RESULT, ({ value, name }) => {
      expect([...Object.values(RPSGameValuesOptions), "tie"]).toContain(value)
      expect(["ahmed", "moh", "No winner"]).toContain(name)
      done()
    })
  })
})
