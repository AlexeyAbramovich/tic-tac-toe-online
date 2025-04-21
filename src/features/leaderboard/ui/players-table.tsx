import { GameDomain } from "@/entities/game";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { PlayerInfo } from "./player-info";

export function PlayersTable({
  players,
}: {
  players: GameDomain.PlayerEntity[];
}) {
  return (
    <Table className="w-[800px] mx-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="text-lg">Позиция в рейтинге</TableHead>
          <TableHead className="text-lg">Игрок</TableHead>
          <TableHead className="text-lg">Рейтинг</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player, idx) => (
          <PlayerInfo key={player.id} position={idx + 1} player={player} />
        ))}
      </TableBody>
    </Table>
  );
}
