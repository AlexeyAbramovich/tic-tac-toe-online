import { UserId } from "@/kernel/ids";

export type UserEntity = {
  id: UserId;
  login: string;
  rating: number;
  passwordHash: string;
  salt: string;
};

export type SessionEntity = {
  id: UserId;
  login: string;
  expiredAt: string;
};

export const DEFAULT_RATING = 100;

export const userToSession = (
  user: UserEntity,
  expiredAt: string,
): SessionEntity => {
  return {
    id: user.id,
    login: user.login,
    expiredAt,
  };
};

export const getNewRating = (winnerRating: number, loserRating: number) => {
  const newWinnerRating = winnerRating + 50;
  const newLoserRating = loserRating - 50 > 0 ? loserRating - 50 : 0;

  return [newWinnerRating, newLoserRating];
};
