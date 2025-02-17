import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../components/AddPlayers";
import { auctionService } from "../../service/auctionService";
import { RootState } from "../../app/store";

const initialState: Player[] = auctionService.getUnsoldPlayers();

const unsoldPlayerSlice = createSlice({
  name: "unsoldPlayer",
  initialState,
  reducers: {
    addUnsoldPlayerToUnsoldList: (state, action: PayloadAction<Player>) => {
      state.push(action.payload);
      auctionService.storeUnsoldPlayers(state);
    },
    resetUnsoldPlayers: () => {
      auctionService.resetUnsoldPlayers();
      return initialState;
    },
  },
});

export const getAllUnsoldPlayers = (state: RootState) => state.unsold;

export const { addUnsoldPlayerToUnsoldList, resetUnsoldPlayers } =
  unsoldPlayerSlice.actions;
export default unsoldPlayerSlice.reducer;
