import { Leaderboard } from "@/features/leaderboard/server";

export default async function LeaderboardPage() {
  return (
    <main className="flex flex-col grow pt-10">
      <Leaderboard />
    </main>
  );
}
