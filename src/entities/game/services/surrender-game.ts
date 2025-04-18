import { GameId } from "@/kernel/ids";
import { left, right } from "@/shared/lib/either";
import { PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";

export async function surrenderGame(gameId: GameId, player: PlayerEntity) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found" as const);
  }

  if (game.status !== "IN_PROGRESS") {
    return left("game-not-in-progress" as const);
  }

  if (!game.players.some((p) => p.id === player.id)) {
    return left("player-not-in-game" as const);
  }

  return right(
    await gameRepository.saveGame({
      ...game,
      status: "GAME_OVER",
      winner: game.players.find((p) => p.id !== player.id)!,
    }),
  );
}
