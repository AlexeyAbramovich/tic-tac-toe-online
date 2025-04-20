import { GameId, UserId } from "@/kernel/ids";
import { left, right } from "@/shared/lib/either";

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

export const getGameCurrentSymbol = (
  game: GameInProgressEntity | GameOverDrawEntity | GameOverEntity,
) => {
  const symbols = game.field.filter((s) => s !== null).length;

  return symbols % 2 === 0 ? GAME_SYMBOLS.X : GAME_SYMBOLS.O;
};

export const getPlayerSymbol = (
  player: PlayerEntity,
  game: GameInProgressEntity | GameOverEntity,
) => {
  const index = game.players.findIndex((p) => p.id === player.id);

  return { 0: GAME_SYMBOLS.X, 1: GAME_SYMBOLS.O }[index];
};

export const doStep = ({
  game,
  player,
  index,
}: {
  game: GameInProgressEntity;
  player: PlayerEntity;
  index: number;
}) => {
  const currentSymbol = getGameCurrentSymbol(game);

  if (currentSymbol !== getPlayerSymbol(player, game)) {
    return left("not-player-symbol");
  }

  if (game.field[index]) {
    return left("cell-already-taken");
  }

  const newField = game.field.map((cell, i) =>
    i === index ? currentSymbol : cell,
  );

  if (calculateWinner(newField)) {
    return right({
      ...game,
      field: newField,
      winner: player,
      status: "GAME_OVER",
    } satisfies GameOverEntity);
  }

  if (isDraw(newField)) {
    return right({
      ...game,
      field: newField,
      status: "GAME_OVER_DRAW",
    } satisfies GameOverDrawEntity);
  }

  return right({
    ...game,
    field: newField,
  });
};

function isDraw(field: Field) {
  const winner = calculateWinner(field);

  if (!winner) {
    return field.every((c) => c !== null);
  } else {
    return false;
  }
}

function calculateWinner(field: Field) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (field[a] && field[a] === field[b] && field[a] === field[c]) {
      return field[a];
    }
  }
  return null;
}
