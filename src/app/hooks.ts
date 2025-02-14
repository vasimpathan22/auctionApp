import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "./store";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<Dispatch>();
