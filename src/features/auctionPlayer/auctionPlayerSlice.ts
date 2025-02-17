import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../components/AddPlayers";
import { auctionService } from "../../service/auctionService";
import { RootState } from "../../app/store";

const initialState: Player[] = auctionService.getPlayersOfAuction();

const auctionPlayerSlice = createSlice({
  name: "auctionPlayer",
  initialState,
  reducers: {
    deletePlayerFromAuction: (state, action: PayloadAction<number>) => {
      const updatedPlayers = state.filter(
        (player) => player.id !== action.payload
      );
      auctionService.storePlayersForAuction(updatedPlayers);
      return updatedPlayers;
    },
    addPlayerToAuction: (state, action: PayloadAction<Player>) => {
      state.push(action.payload);
      auctionService.storePlayersForAuction(state);
    },
    addUnsoldPlayersToAuction: (state, action: PayloadAction<Player[]>) => {
      state.push(...action.payload);
      auctionService.storePlayersForAuction(state);
    },
  },
});

export const getAllAuctionPlayers = (state: RootState) => state.auction;

export const {
  deletePlayerFromAuction,
  addPlayerToAuction,
  addUnsoldPlayersToAuction,
} = auctionPlayerSlice.actions;
export default auctionPlayerSlice.reducer;
