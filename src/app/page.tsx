import { GamesList } from "@/features/game-list/ui/games-list";

export default async function Home() {
  return (
    <main className="flex flex-col gap-4 container mx-auto pt-[100px]">
      <h1 className="text-4xl font-bold">Игры</h1>
      <GamesList />
    </main>
  );
}
