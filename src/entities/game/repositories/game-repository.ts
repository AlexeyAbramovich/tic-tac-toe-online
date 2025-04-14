import { prisma } from "@/shared/lib/db";
import { removePassword } from "@/shared/lib/password";
import { Game, Prisma, User } from "@prisma/client";
import { z } from "zod";
import { GameEntity, GameIdleEntity, GameOverEntity } from "../domain";

async function getGamesList(where?: Prisma.GameWhereInput) {
  const games = await prisma.game.findMany({
    where,
    include: {
      players: true,
      winner: true,
    },
  });

  return games.map(dbGameToGameEntity);
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      id: game.id,
      status: game.status,
      field: Array(9).fill(null),
      players: {
        connect: { id: game.creator.id },
      },
    },
    include: {
      players: true,
      winner: true,
    },
  });

  return dbGameToGameEntity(createdGame);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & { players: User[]; winner?: User | null },
): GameEntity {
  const players = game.players.map(removePassword);
  switch (game.status) {
    case "IDLE": {
      const [creator] = players;
      return {
        id: game.id,
        creator: creator,
        status: game.status,
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
        winner: removePassword(game.winner),
      } satisfies GameOverEntity;
    }
  }
}

export const gameRepository = { getGamesList, createGame };
