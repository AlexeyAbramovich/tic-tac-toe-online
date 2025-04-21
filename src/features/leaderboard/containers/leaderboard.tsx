import { getAllPlayers } from "@/entities/user/server";
import { sortPlayersByRating } from "../utils";
import { LeaderboardClient } from "./leaderbord-client";

export async function Leaderboard() {
  const players = await getAllPlayers();

  return <LeaderboardClient players={sortPlayersByRating(players)} />;
}
