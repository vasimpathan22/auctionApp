import { combineReducers, configureStore } from "@reduxjs/toolkit";
import unsoldPlayerReducer from "../features/unsoldPlayer/unsoldPlayerSlice";
import auctionPlayerReducer from "../features/auctionPlayer/auctionPlayerSlice";

const rootReducer = combineReducers({
  unsold: unsoldPlayerReducer,
  auction: auctionPlayerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
