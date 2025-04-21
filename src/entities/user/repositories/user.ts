import { PlayerEntity } from "@/entities/game/domain";
import { UserId } from "@/kernel/ids";
import { prisma } from "@/shared/lib/db";
import { Prisma } from "@prisma/client";
import { UserEntity } from "../domain";

async function getAllPlayers(): Promise<PlayerEntity[]> {
  const users = await prisma.user.findMany();

  return users.map(dbUserToPlayer);
}

function saveUser(user: UserEntity): Promise<UserEntity> {
  return prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: user,
    update: user,
  });
}

function getUser(where: Prisma.UserWhereInput) {
  return prisma.user.findFirst({ where });
}

async function updateUsersRating({
  winnerId,
  loserId,
  winnerRating,
  loserRating,
}: {
  winnerId: UserId;
  loserId: UserId;
  winnerRating: number;
  loserRating: number;
}) {
  await prisma.user.update({
    where: { id: winnerId },
    data: {
      rating: winnerRating,
    },
  });

  await prisma.user.update({
    where: { id: loserId },
    data: { rating: loserRating },
  });
}

function dbUserToPlayer(user: UserEntity): PlayerEntity {
  return {
    id: user.id,
    login: user.login,
    rating: user.rating,
  };
}

export const userRepository = {
  saveUser,
  getUser,
  getAllPlayers,
  updateUsersRating,
};
