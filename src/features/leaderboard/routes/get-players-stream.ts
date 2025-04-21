import { getAllPlayers, playersEvents } from "@/entities/user/server";
import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";
import { sortPlayersByRating } from "../utils";

export async function getPlayersStreamRoute(req: NextRequest) {
  const { write, addCloseListener, response } = sseStream(req);

  write(sortPlayersByRating(await getAllPlayers()));

  addCloseListener(
    await playersEvents.addPlayersTableChangedLitener(async () => {
      write(sortPlayersByRating(await getAllPlayers()));
    }),
  );

  return response;
}
