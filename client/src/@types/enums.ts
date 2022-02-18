export enum RPSGameValuesOptions {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}

export enum RPSGameModeOptions {
  PLAYER_VS_COMPUTER = "player vs computer",
  COMPUTER_VS_COMPUTER = "computer vs computer",
}

export enum GameEvents {
  INIT_GAME = "init:game",
  GAME_INITIATED = "game:initiated",
  JOIN_GAME = "join:game",
  PLAYER1_JOINED = "player:one:joined",
  PLAYER2_JOINED = "player:two:joined",
  PLAYER1_ANSWER = "player:one:answer",
  PLAYER2_ANSWER = "player:two:answer",
  GAME_RESULT = "game:result",
  GAME_ERROR = "game:error",
}

export enum GameErrorCodes {
  INVALID_DATA = "Invalid_data",
  INTERNAL_ERROR = "internal_error",
}

export enum StartGameOption {
  CREATOR = "creator",
  JOIN = "join",
}
