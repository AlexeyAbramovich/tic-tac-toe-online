import { getAllPlayers } from "./get-all-players";
import { playersEvents } from "./players-events";

export async function updatePlayersTable() {
  const players = await getAllPlayers();

  const sortedPlayers = players.sort((p1, p2) => p2.rating - p1.rating);

  return playersEvents.emit({
    type: "players-table-changed",
    data: sortedPlayers,
  });
}
