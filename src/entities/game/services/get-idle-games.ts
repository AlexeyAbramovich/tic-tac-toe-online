import { GameIdleEntity } from "../domain";
import { gameRepository } from "../repositories/game";

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  const games = await gameRepository.getGamesList({ status: "IDLE" });

  return games as GameIdleEntity[];
}
