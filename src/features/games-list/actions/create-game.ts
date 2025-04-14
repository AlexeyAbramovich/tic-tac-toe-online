"use server";

import { createGame } from "@/entities/game/server";
import { prisma } from "@/shared/lib/db";
import { left } from "@/shared/lib/either";
import { redirect } from "next/navigation";

export async function createdGameAction() {
  const user = await prisma.user.findFirst();

  if (!user) return left("user-not-found" as const);

  const createdGame = await createGame(user);

  if (createdGame.type === "right") {
    redirect(`/game/${createdGame.value.id}`);
  }

  return createdGame;
}
