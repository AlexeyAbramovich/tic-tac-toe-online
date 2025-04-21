import {
  updatePlayersRating,
  updatePlayersTable,
} from "@/entities/user/server";
import { GameId } from "@/kernel/ids";
import { left, right } from "@/shared/lib/either";
import { doStep, PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import { gameEvents } from "./game-events";

export async function stepGame(
  gameId: GameId,
  player: PlayerEntity,
  index: number,
) {
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

  const stepResult = doStep({ game, player, index });

  if (stepResult.type === "left") {
    return stepResult;
  }

  if (stepResult.value.status === "GAME_OVER") {
    await updatePlayersRating(
      player,
      game.players.find((p) => p.id !== player.id)!,
    );
  }

  const newGame = await gameRepository.saveGame(stepResult.value);

  await gameEvents.emit({ type: "game-changed", data: newGame });

  await updatePlayersTable();

  return right(newGame);
}
