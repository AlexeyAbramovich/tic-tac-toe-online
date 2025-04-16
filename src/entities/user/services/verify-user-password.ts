import { left, right } from "@/shared/lib/either";
import { getUser } from "../repositories/user";
import { passwordService } from "./passwords";

export async function verifyUserPassword({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  const user = await getUser({ login });

  if (!user) {
    return left("wrong-login-or-password" as const);
  }

  const isVarified = await passwordService.comparePasswords({
    hash: user.passwordHash,
    salt: user.salt,
    password,
  });

  if (!isVarified) {
    return left("wrong-login-or-password" as const);
  }

  return right(user);
}
