import { GameDomain } from "@/entities/game";
import { TableCell, TableRow } from "@/shared/ui/table";

export function PlayerInfo({
  position,
  player,
}: {
  position: number;
  player: GameDomain.PlayerEntity;
}) {
  return (
    <TableRow>
      <TableCell className="text-lg">{position}.</TableCell>
      <TableCell className="text-lg">{player.login}</TableCell>
      <TableCell className="text-lg">{player.rating}</TableCell>
    </TableRow>
  );
}
