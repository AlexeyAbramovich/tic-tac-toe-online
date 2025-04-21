import { PlayerEntity } from "@/entities/game/domain";
import { EventsChannel } from "@/shared/lib/events";

type PlayersTableChanged = {
  type: "players-table-changed";
  data: PlayerEntity[];
};

type PlayersTableChangedListener = (data: PlayersTableChanged) => void;

class PlayersEventsService {
  playerEvents = new EventsChannel("players");

  addPlayersTableChangedLitener(listener: PlayersTableChangedListener) {
    return this.playerEvents.consume("players-table-changed", (data) =>
      listener(data as PlayersTableChanged),
    );
  }

  emit(event: PlayersTableChanged) {
    if (event.type === "players-table-changed") {
      return this.playerEvents.emit("players-table-changed", event);
    }
  }
}

export const playersEvents = new PlayersEventsService();
