import {
  updatePlayersRating,
  updatePlayersTable,
} from "@/entities/user/server";
import { GameId } from "@/kernel/ids";
import { left, right } from "@/shared/lib/either";
import { PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import { gameEvents } from "./game-events";

export async function surrenderGame(gameId: GameId, player: PlayerEntity) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found");
  }

  if (game.status !== "IN_PROGRESS") {
    return left("game-not-in-progress");
  }

  if (!game.players.some((p) => p.id === player.id)) {
    return left("player-not-in-game");
  }

  const winner = game.players.find((p) => p.id !== player.id);

  await updatePlayersRating(winner!, player);

  const newGame = await gameRepository.saveGame({
    ...game,
    status: "GAME_OVER",
    winner: winner!,
  });

  await gameEvents.emit({ type: "game-changed", data: newGame });

  await updatePlayersTable();

  return right(newGame);
}
