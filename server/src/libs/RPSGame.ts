import { IPlayer, IPlayerGameResult } from "../@types/interfaces"

/**
 * The RPSGame class.
 * @public
 */
export default class RPSGame {
  private GameRoles = {
    // rock beats scissors
    rock: "scissors",
    // scissors beats paper
    scissors: "paper",
    // Paper beats rock,
    paper: "rock",
  }
  /**
   * Returns the winner of the game or `Tie`.
   * @remarks
   * This method is part of the {@link core-library#RPSGame | RPSGame subsystem}.
   * @param player1 - The first input player1
   * @param player2 - The second input player2
   * @returns `winner`|`Tie`
   *
   * @beta
   */
  rpsGameResolver(player1: IPlayer, player2: IPlayer): IPlayerGameResult {
    if (this.GameRoles[player1.value.toLowerCase()] === player2.value.toLowerCase()) {
      return player1
    }
    if (this.GameRoles[player2.value.toLowerCase()] === player1.value.toLowerCase()) {
      return player2
    }
    // TODO: we can add more conditions here to handle new cases
    return { name: "No winner", value: "tie" }
  }
}
