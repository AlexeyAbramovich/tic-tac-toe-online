import { userRepository } from "../repositories/user";

export async function getAllPlayers() {
  return userRepository.getAllPlayers();
}
