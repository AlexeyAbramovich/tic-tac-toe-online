"use server";

import { createGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { routes } from "@/kernel/routes";
import { left } from "@/shared/lib/either";
import { redirect } from "next/navigation";

export async function createdGameAction() {
  const user = await getCurrentUser();

  if (!user) return left("user-not-found");

  const createdGame = await createGame(user);

  if (createdGame.type === "right") {
    redirect(routes.game(createdGame.value.id));
  }

  return createdGame;
}
