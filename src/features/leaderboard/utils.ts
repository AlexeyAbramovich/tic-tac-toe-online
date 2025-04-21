import { GameDomain } from "@/entities/game";

export const sortPlayersByRating = (players: GameDomain.PlayerEntity[]) =>
  players.sort((p1, p2) => p2.rating - p1.rating);
