import { GameDomain } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { GameField } from "../ui/field";
import { GameLayout } from "../ui/layout";
import { GamePlayers } from "../ui/players";
import { GameStatus } from "../ui/status";

export function Game({ gameId }: { gameId: GameId }) {
  const game: GameDomain.GameEntity = {
    id: "1",
    creator: {
      id: "1",
      login: "Test",
      rating: 1000,
    },
    field: Array(9).fill(null),
    status: "IDLE",
  };

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}
