import { Player } from "../components/AddPlayers";

class PlayerService {
  constructor() {
    console.log("Use this service to manage players list");
  }

  getPlayerList() {
    const players = localStorage.getItem("playersList");
    if (players) {
      return JSON.parse(players) as Player[];
    }
    return [];
  }

  savePlayersList(players: Player[]) {
    localStorage.setItem("playersList", JSON.stringify(players));
  }
}

export const playerService = new PlayerService();
