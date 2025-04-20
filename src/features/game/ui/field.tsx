"use client";

import { GameDomain } from "@/entities/game";

export function GameField({
  game,
  onCellClick,
}: {
  game: GameDomain.GameEntity;
  onCellClick?: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-3">
      {game.field.map((symbol, index) => (
        <button
          key={index}
          className="border border-primary w-20 h-20 flex justify-center items-center text-5xl"
          onClick={() => onCellClick?.(index)}
        >
          {symbol ?? ""}
        </button>
      ))}
    </div>
  );
}
