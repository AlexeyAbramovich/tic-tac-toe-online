import { sessionService } from "@/entities/user/server";
import { routes } from "@/kernel/routes";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await sessionService.verifySession();

  return (
    <div className="flex flex-col grow">
      <header className="px-10 py-4 flex flex-row gap-4 justify-between border-b border-b-primary/50 items-center">
        <div className="text-xl">
          <Link href="/">Tic-tac-toe-online</Link>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-lg">{session.login}</div>
          <Link href={routes.leaderBoard()}>
            <Button>Таблица лидеров</Button>
          </Link>
          <form
            action={async () => {
              "use server";
              sessionService.deleteSession();
              redirect(routes.signIn());
            }}
          >
            <Button>Log out</Button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
