import { userRepository } from "../repositories/user";
import { sessionService } from "./sessions";

export async function getCurrentUser() {
  const { session } = await sessionService.verifySession();
  return userRepository.getUser({ login: session.login });
}
