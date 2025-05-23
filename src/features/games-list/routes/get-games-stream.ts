import { gameEvents, getIdleGames } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";

export async function getGamesStreamRoute(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const { response, write, addCloseListener } = sseStream(req);

  write(await getIdleGames());

  addCloseListener(
    await gameEvents.addGameCreatedListener(async () => {
      write(await getIdleGames());
    }),
  );

  return response;
}
