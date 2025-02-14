import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../components/AddPlayers";
import { auctionService } from "../../service/auctionService";
import { RootState } from "../../app/store";

const initialState: Player[] = auctionService.getUnsoldPlayers();

const unsoldPlayerSlice = createSlice({
  name: "unsoldPlayer",
  initialState,
  reducers: {
    addUnsoldPlayer: (state, action: PayloadAction<Player>) => {
      state.push(action.payload);
      auctionService.storeUnsoldPlayers(state);
    },
  },
});

export const getAllUnsoldPlayers = (state: RootState) => state.unsold;

export const { addUnsoldPlayer } = unsoldPlayerSlice.actions;
export default unsoldPlayerSlice.reducer;
