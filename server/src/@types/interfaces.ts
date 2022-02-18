import { RPSGameValuesOptions, RPSGameModeOptions } from "./enums"

export interface IPlayer {
  name: string
  value: RPSGameValuesOptions
}

export interface IPlayerGameResult {
  name: string | "No winner"
  value: RPSGameValuesOptions | "tie"
}
export interface IGamePlayer {
  createdAt: number
  creator: IPlayer
  secondPlayer?: IPlayer
}
export interface IGamePlayers {
  [key: string]: IGamePlayer
}

export interface IGameRoom {
  roomId: string
  gameInfo: IGamePlayer
}

export interface ISocketPayload {
  playerName?: string
  mode?: RPSGameModeOptions
  roomId?: RPSGameModeOptions
  answer?: RPSGameValuesOptions
}
