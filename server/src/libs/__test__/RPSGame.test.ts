import { RPSGameValuesOptions } from "../../@types/enums"
import { IPlayer } from "../../@types/interfaces"
import RPSGame from "../RPSGame"

describe("services/RPSGame", () => {
  const rpsGame = new RPSGame()

  it("defines rpsGameResolver()", () => {
    expect(typeof rpsGame.rpsGameResolver).toBe("function")
  })

  it("rock beats scissors ", async () => {
    const player1: IPlayer = { name: "Ahmed", value: RPSGameValuesOptions.ROCK }
    const player2: IPlayer = { name: "Moh", value: RPSGameValuesOptions.SCISSORS }
    const result = rpsGame.rpsGameResolver(player1, player2)
    expect(result.name).toBe(player1.name)
    expect(result.value).toBe(player1.value)
  })
  it("scissors beats paper", async () => {
    const player1: IPlayer = { name: "Ahmed", value: RPSGameValuesOptions.SCISSORS }
    const player2: IPlayer = { name: "Moh", value: RPSGameValuesOptions.PAPER }
    const result = rpsGame.rpsGameResolver(player1, player2)
    expect(result.name).toBe(player1.name)
    expect(result.value).toBe(player1.value)
  })
  it("paper beats rock", async () => {
    const player1: IPlayer = { name: "Ahmed", value: RPSGameValuesOptions.PAPER }
    const player2: IPlayer = { name: "Moh", value: RPSGameValuesOptions.ROCK }
    const result = rpsGame.rpsGameResolver(player1, player2)
    expect(result.name).toBe(player1.name)
    expect(result.value).toBe(player1.value)
  })
  it("tie", async () => {
    const player1: IPlayer = { name: "Ahmed", value: RPSGameValuesOptions.PAPER }
    const player2: IPlayer = { name: "Moh", value: RPSGameValuesOptions.PAPER }
    const result = rpsGame.rpsGameResolver(player1, player2)
    expect(result.name).toBe("No winner")
    expect(result.value).toBe("tie")
  })
})
