"use server";

import { createGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { left } from "@/shared/lib/either";
import { redirect } from "next/navigation";

export async function createdGameAction() {
  const user = await getCurrentUser();

  if (!user) return left("user-not-found" as const);

  const createdGame = await createGame(user);

  if (createdGame.type === "right") {
    redirect(`/game/${createdGame.value.id}`);
  }

  return createdGame;
}
