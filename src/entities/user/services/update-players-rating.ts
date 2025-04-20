import { PlayerEntity } from "@/entities/game/domain";
import { getNewRating } from "../domain";
import { userRepository } from "../repositories/user";

export async function updatePlayersRating(
  winner: PlayerEntity,
  loser: PlayerEntity,
) {
  const [newWinnerRating, newLoserRating] = getNewRating(
    winner.rating,
    loser.rating,
  );

  return userRepository.updateUsersRating({
    winnerId: winner.id,
    loserId: loser.id,
    winnerRating: newWinnerRating,
    loserRating: newLoserRating,
  });
}
