import { Button } from "@/shared/ui/button";
import React from "react";

export function SubmitButton({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending?: boolean;
}) {
  return (
    <Button type="submit" className="w-full" disabled={isPending}>
      {children}
    </Button>
  );
}
