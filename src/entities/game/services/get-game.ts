import { GameId } from "@/kernel/ids";
import { gameRepository } from "../repositories/game";

export const getGameById = (gameId: GameId) =>
  gameRepository.getGame({ id: gameId });
