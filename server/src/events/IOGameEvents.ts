import { Server, Socket } from "socket.io"
import { uid } from "uid"
import { randomValue } from "../utils/array"
import { GameErrorCodes, GameEvents, RPSGameModeOptions, RPSGameValuesOptions } from "../@types/enums"
import { IGamePlayer, IGamePlayers, IGameRoom, ISocketPayload } from "../@types/interfaces"
import RPSGame from "../libs/RPSGame"

/**
 * The IOGameEvents class for all game events.
 * @public
 */
export default class IOGameEvents {
  private players: IGamePlayers = {}
  private roomId: string
  private mode: RPSGameModeOptions
  private _io: Server
  private _rpsGame: RPSGame
  private _socket: Socket

  constructor(io: Server, rpsGame: RPSGame) {
    this._io = io
    this._rpsGame = rpsGame
    this.eventsHandler()
  }

  /**
   * get all the players
   * @returns players
   */
  public get gamePlayers(): IGamePlayers {
    if (Object.keys(this.players).length <= 0) throw new Error("There are no players")
    return this.players
  }
  /**
   * get game mode type
   * @returns mode
   */
  public get gameMode(): RPSGameModeOptions {
    if (!this.mode) throw new Error("Can't get game mode before initializing the game")
    return this.mode
  }
  public get gameRomeId(): string {
    if (!this.roomId) throw new Error("Can't get current room id before initializing the game")
    return this.roomId
  }

  /**
   * determine if the game is played by machine or not
   * @returns boolean
   */
  public isBot(): boolean {
    return this.mode === RPSGameModeOptions.COMPUTER_VS_COMPUTER
  }

  private eventsHandler(): void {
    this._io.on("connection", async (socket) => {
      this._socket = socket
      // events
      socket.on(GameEvents.INIT_GAME, (payload) => this.initGame(payload))
      socket.on(GameEvents.JOIN_GAME, (payload) => this.joinGame(payload))
      // first player/creator could be a machine or player
      socket.on(GameEvents.PLAYER1_ANSWER, (payload) => this.playerOneResponse(payload))
      // always the second player will be a machine
      socket.on(GameEvents.PLAYER2_ANSWER, (payload) => this.playerTwoResponse(payload))
      // error handling
      socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`)
        this.catchError(`disconnect ${socket.id} due to ${reason}`)
      })
      socket.on("connect_error", (err) => {
        console.log(err.message)
        this.catchError(err.message)
      })
    })
  }

  /**
   * listen for creating a new game and returns game data
   *
   * @remarks
   * This method is part of the {@link core-library#IOGameEvents | IOGameEvents subsystem}.
   * @param payload
   */
  private initGame(payload: ISocketPayload): void {
    const { playerName, mode } = payload
    if (!playerName) return this.catchError("Invalid player name", GameErrorCodes.INVALID_DATA)
    if (Object.values(RPSGameModeOptions).indexOf(mode) == -1) return this.catchError("Invalid game mode value", GameErrorCodes.INVALID_DATA)
    const roomId: string = uid(10)
    this._socket.join(roomId)
    this.players[roomId] = {
      createdAt: Date.now(),
      creator: { name: playerName, value: "" as any },
      secondPlayer: null,
    }
    this.mode = mode
    this.roomId = roomId
    const initGameObject: IGameRoom = { roomId, gameInfo: this.players[roomId] }
    this._socket.emit(GameEvents.GAME_INITIATED, initGameObject)
  }
  /**
   * listen for joining a new player and returns game data
   * @remarks
   * This method is part of the {@link core-library#IOGameEvents | IOGameEvents subsystem}.
   * @param payload
   */
  private joinGame(payload: ISocketPayload): void {
    const { roomId, playerName } = payload
    if (!playerName) return this.catchError("Invalid player name", GameErrorCodes.INVALID_DATA)
    if (!roomId) return this.catchError("Invalid room value", GameErrorCodes.INVALID_DATA)
    const roomData: IGamePlayer = this.players[roomId]
    if (!roomData) return this.catchError("Incorrect room value", GameErrorCodes.INVALID_DATA)
    this.players[roomId] = {
      ...roomData,
      secondPlayer: { name: playerName, value: "" as any },
    }
    const gameRome: IGameRoom = { roomId, gameInfo: this.players[roomId] }
    this._socket.join(roomId)
    // send message to player 2 after joining the game
    this._io.sockets.to(roomId).emit(GameEvents.PLAYER2_JOINED, gameRome)
    // let player 1 know after accepting his invitation
    this._socket.emit(GameEvents.PLAYER1_JOINED, gameRome)
  }

  /**
   * listen for the choice of the player one
   * @remarks
   * This method is part of the {@link core-library#IOGameEvents | IOGameEvents subsystem}.
   * @param payload
   */
  private playerOneResponse(payload: ISocketPayload): void {
    // here we need to check if the creator is machine or real player
    let { roomId, answer } = payload
    // case one: the game creator is a bot
    const bot = this.mode === RPSGameModeOptions.COMPUTER_VS_COMPUTER
    if (bot) {
      answer = randomValue(Object.values(RPSGameValuesOptions)) as RPSGameValuesOptions
    }
    // case two: the game creator is real player
    if (Object.values(RPSGameValuesOptions).indexOf(answer) === -1) return this.catchError("Invalid choice value", GameErrorCodes.INVALID_DATA)

    this.players[roomId].creator.value = answer

    if (this.players[roomId].secondPlayer.value) this.gameResult(roomId)
  }
  /**
   *  * listen for the choice of the player two
   * @remarks
   * This method is part of the {@link core-library#IOGameEvents | IOGameEvents subsystem}.
   * @param payload
   */
  private playerTwoResponse(payload: ISocketPayload): void {
    const { roomId } = payload
    // always the second player will be a machine
    this.players[roomId].secondPlayer.value = randomValue(Object.values(RPSGameValuesOptions)) as RPSGameValuesOptions
    if (this.players[roomId].creator.value) this.gameResult(roomId)
  }
  /**
   * calculates game result and emit the result
   *
   * @remarks
   * This method is part of the {@link core-library#IOGameEvents | IOGameEvents subsystem}.
   * @param roomId
   */
  private gameResult(roomId: string): void {
    const { creator, secondPlayer } = this.players[roomId]
    const result = this._rpsGame.rpsGameResolver(creator, secondPlayer)
    this._io.sockets.to(roomId).emit(GameEvents.GAME_RESULT, { ...result, game: this.players[roomId] })
  }

  private catchError(msg: string, code?: GameErrorCodes): void {
    this._socket.emit(GameEvents.GAME_ERROR, { message: msg, code: code || GameErrorCodes.INTERNAL_ERROR })
  }
}
