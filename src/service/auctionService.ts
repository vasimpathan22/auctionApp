import { Player } from "../components/AddPlayers";
class AuctionService {
  constructor() {
    console.log("Use this service to managae auction");
  }
  storeUnsoldPlayers(players: Player[]) {
    localStorage.setItem("unsoldPlayers", JSON.stringify(players));
  }

  getUnsoldPlayers() {
    const unsoldPlayers = localStorage.getItem("unsoldPlayers");
    if (unsoldPlayers) return JSON.parse(unsoldPlayers) as Player[];
    return [];
  }

  storePlayersOfAuction(players: Player[]) {
    localStorage.setItem("auctionPlayers", JSON.stringify(players));
  }

  getPlayersOfAuction() {
    const auctionPlayers = localStorage.getItem("auctionPlayers");
    if (auctionPlayers) return JSON.parse(auctionPlayers) as Player[];
    return [];
  }
}

export const auctionService = new AuctionService();
