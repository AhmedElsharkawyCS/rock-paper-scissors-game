import prompts from "prompts"
import { RPSGameModeOptions, RPSGameValuesOptions } from "./@types/enums"
import RPSGame from "./libs/RPSGame"
import { randomValue } from "./utils/array"

const main = async () => {
  try {
    console.log("ROCK PAPER SCISSORS(RPS) CLI....")
    const rpsGame = new RPSGame()
    const mode = await prompts({
      type: "select",
      name: "value",
      message: "select game's mode!",
      choices: Object.values(RPSGameModeOptions).map((item) => ({ value: item, title: item })),
    })
    const playerOneName = await prompts({
      type: "text",
      name: "value",
      message: "enter first player/computer name?",
      validate: (value) => (value ? true : "Invalid name"),
    })
    const secondPlayerName = await prompts({
      type: "text",
      name: "value",
      message: "enter second player/computer name?",
      validate: (value) => (value ? true : "Invalid name"),
    })

    if (mode.value === RPSGameModeOptions.PLAYER_VS_COMPUTER) {
      console.log(`------------------------------Game Mode: ${RPSGameModeOptions.PLAYER_VS_COMPUTER} -----------------------`)
      const playerOneAnswer = await prompts({
        type: "select",
        name: "value",
        message: "what is your answer?",
        choices: Object.values(RPSGameValuesOptions).map((item) => ({ value: item, title: item })),
      })
      const computerAnswer = randomValue(Object.keys(RPSGameValuesOptions)) as RPSGameValuesOptions
      const result = rpsGame.rpsGameResolver(
        { name: playerOneName.value, value: playerOneAnswer.value },
        { name: secondPlayerName.value, value: computerAnswer },
      )
      console.log(`Game Result ------------------- Winner Name: ${result.name}`)
    } else {
      console.log(`----------------------------------Game Mode: ${RPSGameModeOptions.COMPUTER_VS_COMPUTER} ---------------------------`)
      const computer1Answer = randomValue(Object.keys(RPSGameValuesOptions)) as RPSGameValuesOptions
      const computer2Answer = randomValue(Object.keys(RPSGameValuesOptions)) as RPSGameValuesOptions
      const result = rpsGame.rpsGameResolver(
        { name: playerOneName.value, value: computer1Answer },
        { name: secondPlayerName.value, value: computer2Answer },
      )
      console.log(`Game Result -------------------Winner Name: ${result.name}`)
    }
  } catch (error) {
    console.log("something went wrong...")
    console.log(`Error Message: ${error.message}`)
  }
}

main()
