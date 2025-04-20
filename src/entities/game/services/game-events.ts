import { GameDomain } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { EventsChannel } from "@/shared/lib/events";

type GameChanged = {
  type: "game-changed";
  data: GameDomain.GameEntity;
};

type GameCreated = {
  type: "game-created";
};

type GameEvent = GameChanged | GameCreated;

type GameChangedListener = (game: GameChanged) => void;

type GameCreatedListener = (game: GameCreated) => void;

class GameEventsService {
  eventsChannel = new EventsChannel("game");

  addGameChangedListener(gameId: GameId, listener: GameChangedListener) {
    return this.eventsChannel.consume(gameId, (data) => {
      listener(data as GameChanged);
    });
  }

  addGameCreatedListener(listener: GameCreatedListener) {
    return this.eventsChannel.consume("game-created", (data) => {
      listener(data as GameCreated);
    });
  }

  emit(event: GameEvent) {
    if (event.type === "game-changed") {
      return this.eventsChannel.emit(event.data.id, event);
    }

    if (event.type === "game-created") {
      return this.eventsChannel.emit("game-created", event);
    }
  }
}

export const gameEvents = new GameEventsService();
