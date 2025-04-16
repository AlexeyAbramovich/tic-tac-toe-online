import { GameId, UserId } from "@/kernel/ids";

export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrawEntity;

export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity;
  field: Field;
  status: "IDLE";
};

export type GameInProgressEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "IN_PROGRESS";
};

export type GameOverEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "GAME_OVER";
  winner: PlayerEntity;
};

export type GameOverDrawEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "GAME_OVER_DRAW";
};

export type PlayerEntity = {
  id: UserId;
  login: string;
  rating: number;
};

export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;

export const GAME_SYMBOLS = {
  X: "X",
  O: "O",
};

export const getGameCurrentStep = (
  game: GameInProgressEntity | GameOverDrawEntity | GameOverEntity,
) => {
  const symbols = game.field.filter((s) => s !== null).length;

  return symbols % 2 === 0 ? GAME_SYMBOLS.X : GAME_SYMBOLS.O;
};

export const getNextSymbol = (gameSymbol: GameSymbol) => {
  return gameSymbol === GAME_SYMBOLS.X ? GAME_SYMBOLS.O : GAME_SYMBOLS.X;
};
