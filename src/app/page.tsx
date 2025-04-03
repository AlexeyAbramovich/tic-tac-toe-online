import { prisma } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";

export default async function Home() {
  console.log(await prisma.game.findMany());

  return (
    <div>
      <Button>Кнопка</Button>
    </div>
  );
}
