import { left, right } from "@/shared/lib/either";
import cuid from "cuid";
import { PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game-repository";

export async function createGame(player: PlayerEntity) {
  const playerGames = await gameRepository.getGamesList({
    players: { some: { id: player.id } },
    status: "IDLE",
  });

  const isGameInIdleStatus = playerGames.some(
    (game) => game.status === "IDLE" && game.creator.id === player.id,
  );

  if (isGameInIdleStatus) {
    return left("can-create-only-one-game" as const);
  }

  const createdGame = await gameRepository.createGame({
    id: cuid(),
    creator: player,
    status: "IDLE",
  });

  return right(createdGame);
}
