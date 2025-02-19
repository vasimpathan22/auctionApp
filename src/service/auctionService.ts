import { Player } from "../components/AddPlayers";
class AuctionService {
  constructor() {}
  storeUnsoldPlayers(players: Player[]) {
    localStorage.setItem("unsoldPlayers", JSON.stringify(players));
  }

  getUnsoldPlayers() {
    const unsoldPlayers = localStorage.getItem("unsoldPlayers");
    if (unsoldPlayers) return JSON.parse(unsoldPlayers) as Player[];
    return [];
  }

  resetUnsoldPlayers() {
    localStorage.removeItem("unsoldPlayers");
  }

  storePlayersForAuction(players: Player[]) {
    localStorage.setItem("auctionPlayers", JSON.stringify(players));
  }

  getPlayersOfAuction() {
    const auctionPlayers = localStorage.getItem("auctionPlayers");
    if (auctionPlayers) return JSON.parse(auctionPlayers) as Player[];
    return [];
  }

  resetAuctionPlayers() {
    localStorage.removeItem("auctionPlayers");
  }
}

export const auctionService = new AuctionService();
