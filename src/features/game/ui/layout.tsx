import { Card, CardContent, CardHeader } from "@/shared/ui/card";

type GameLayoutProps = {
  players?: React.ReactNode;
  status?: React.ReactNode;
  field?: React.ReactNode;
};

export function GameLayout({ status, players, field }: GameLayoutProps) {
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-bold">Крестики нолики 3х3</div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {players}
        {status}
        <div className="flex items-center justify-center">{field}</div>
      </CardContent>
    </Card>
  );
}
