import { prisma } from "@/shared/lib/db";
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

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & { players: User[]; winner?: User | null },
): GameEntity {
  switch (game.status) {
    case "IDLE": {
      return {
        id: game.id,
        creator: game.players[0],
        status: game.status,
      } satisfies GameIdleEntity;
    }
    case "IN_PROGRESS":
    case "GAME_OVER_DRAW":
      return {
        id: game.id,
        players: game.players,
        field: fieldSchema.parse(game.field),
        status: game.status,
      };

    case "GAME_OVER": {
      if (!game.winner) {
        throw new Error("Winner should be in game over");
      }
      return {
        id: game.id,
        players: game.players,
        field: fieldSchema.parse(game.field),
        status: game.status,
        winner: game.winner,
      } satisfies GameOverEntity;
    }
  }
}

export const gameRepository = { getGamesList };
