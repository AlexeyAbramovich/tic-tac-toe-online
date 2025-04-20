import { getCurrentUser } from "@/entities/user/server";
import { GamesList } from "@/features/games-list/containers/games-list";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex flex-col gap-4 container mx-auto pt-[100px]">
      <h1 className="text-4xl font-bold">Игры</h1>
      <div className="text-lg">Рейтинг: {user?.rating}</div>
      <GamesList />
    </main>
  );
}
