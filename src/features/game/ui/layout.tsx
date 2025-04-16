import { Card, CardContent, CardHeader } from "@/shared/ui/card";

type GameLayoutProps = {
  players?: React.ReactNode;
  status?: React.ReactNode;
  field?: React.ReactNode;
};

export function GameLayout({ status, players, field }: GameLayoutProps) {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent className="flex flex-col gap-4">
        {players}
        {status}
        <div className="flex items-center justify-center">{field}</div>
      </CardContent>
    </Card>
  );
}
