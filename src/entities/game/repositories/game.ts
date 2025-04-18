import { GameId } from "@/kernel/ids";
import { prisma } from "@/shared/lib/db";
import { Game, GamePlayer, Prisma, User } from "@prisma/client";
import { z } from "zod";
import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  PlayerEntity,
} from "../domain";

const gameInclude = {
  players: { include: { user: true } },
  winner: { include: { user: true } },
};

async function getGamesList(where?: Prisma.GameWhereInput) {
  const games = await prisma.game.findMany({
    where,
    include: gameInclude,
  });

  return games.map(dbGameToGameEntity);
}

async function getGame(where?: Prisma.GameWhereInput) {
  const game = await prisma.game.findFirst({
    where,
    include: gameInclude,
  });

  if (game) {
    return dbGameToGameEntity(game);
  }

  return undefined;
}

async function saveGame(
  game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity,
) {
  const winnerId =
    game.status === "GAME_OVER"
      ? await prisma.gamePlayer
          .findFirstOrThrow({
            where: {
              userId: game.winner.id,
            },
          })
          .then((p) => p.id)
      : undefined;

  return dbGameToGameEntity(
    await prisma.game.update({
      where: {
        id: game.id,
      },
      data: {
        status: game.status,
        field: game.field,
        winnerId: winnerId,
      },
      include: gameInclude,
    }),
  );
}

async function startGame(gameId: GameId, player: PlayerEntity) {
  return dbGameToGameEntity(
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        players: { create: { userId: player.id, index: 1 } },
        status: "IN_PROGRESS",
      },
      include: gameInclude,
    }),
  );
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      id: game.id,
      status: game.status,
      field: game.field,
      players: {
        create: {
          index: 0,
          userId: game.creator.id,
        },
      },
    },
    include: gameInclude,
  });

  return dbGameToGameEntity(createdGame);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & {
    players: Array<GamePlayer & { user: User }>;
    winner?: (GamePlayer & { user: User }) | null;
  },
): GameEntity {
  const players = game.players
    .sort((a, b) => a.index - b.index)
    .map(dbPlayerToPlayer);

  switch (game.status) {
    case "IDLE": {
      const [creator] = players;
      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity;
    }
    case "IN_PROGRESS":
    case "GAME_OVER_DRAW":
      return {
        id: game.id,
        players: players,
        field: fieldSchema.parse(game.field),
        status: game.status,
      };

    case "GAME_OVER": {
      if (!game.winner) {
        throw new Error("Winner should be in game over");
      }
      return {
        id: game.id,
        players: players,
        field: fieldSchema.parse(game.field),
        status: game.status,
        winner: dbPlayerToPlayer(game.winner),
      } satisfies GameOverEntity;
    }
  }
}

export const dbPlayerToPlayer = (
  player: GamePlayer & { user: User },
): PlayerEntity => {
  return {
    id: player.user.id,
    login: player.user.login,
    rating: player.user.rating,
  };
};

export const gameRepository = {
  getGamesList,
  getGame,
  startGame,
  createGame,
  saveGame,
};
