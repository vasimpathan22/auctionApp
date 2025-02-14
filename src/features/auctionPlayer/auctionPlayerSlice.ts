import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../components/AddPlayers";
import { auctionService } from "../../service/auctionService";
import { RootState } from "../../app/store";

const initialState: Player[] = auctionService.getPlayersOfAuction();

const auctionPlayerSlice = createSlice({
  name: "auctionPlayer",
  initialState,
  reducers: {
    deletePlayer: (state, action: PayloadAction<number>) => {
      const updatedPlayers = state.filter(
        (player) => player.id !== action.payload
      );
      auctionService.storePlayersOfAuction(updatedPlayers);
      return updatedPlayers;
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.push(action.payload);
      auctionService.storePlayersOfAuction(state);
    },
  },
});

export const getAllAuctionPlayers = (state: RootState) => state.auction;

export const { deletePlayer, addPlayer } = auctionPlayerSlice.actions;
export default auctionPlayerSlice.reducer;
