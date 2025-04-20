"use server";

import { stepGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { GameId } from "@/kernel/ids";
import { left } from "@/shared/lib/either";

export const gameStepAction = async ({
  index,
  gameId,
}: {
  index: number;
  gameId: GameId;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return left("user-not-found");
  }

  return await stepGame(gameId, currentUser, index);
};
