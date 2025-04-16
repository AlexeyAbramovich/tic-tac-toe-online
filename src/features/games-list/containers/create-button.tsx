"use client";

import { mapLeft, right } from "@/shared/lib/either";
import { useActionState } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import { startTransition } from "react";
import { createdGameAction } from "../actions/create-game";

export function CreateButton() {
  const [state, dispatch, isPending] = useActionState(
    createdGameAction,
    right(undefined),
  );

  return (
    <Button
      disabled={isPending}
      onClick={() => startTransition(dispatch)}
      error={mapLeft(
        state,
        (e) =>
          ({
            ["can-create-only-one-game"]: "Вы можете создать только одну игру",
            ["user-not-found"]: "Пользователя нету",
          })[e],
      )}
    >
      Создать игру
    </Button>
  );
}
