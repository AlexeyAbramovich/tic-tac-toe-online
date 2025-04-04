export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrawEntity;

export type GameIdleEntity = {
  id: string;
  creator: PlayerEntity;
  status: "IDLE";
};

export type GameInProgressEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  status: "IN_PROGRESS";
};

export type GameOverEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  status: "GAME_OVER";
  winner: PlayerEntity;
};

export type GameOverDrawEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  status: "GAME_OVER_DRAW";
};

export type PlayerEntity = {
  id: string;
  login: string;
  rating: number;
};

export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;
