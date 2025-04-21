"use client";

import { GameDomain } from "@/entities/game";
import { routes } from "@/kernel/routes";
import { useEventSource } from "@/shared/lib/sse/client";
import { PlayersTable } from "../ui/players-table";

export function LeaderboardClient({
  players,
}: {
  players: GameDomain.PlayerEntity[];
}) {
  const { dataStream: playersStream = players, isPending } = useEventSource<
    GameDomain.PlayerEntity[]
  >(routes.playersStream());

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <PlayersTable players={playersStream} />;
}
