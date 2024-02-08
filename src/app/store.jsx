import { configureStore } from "@reduxjs/toolkit";
import emsReducer from "../features/ems/emsSlice";

export const store = configureStore({
  reducer: emsReducer,
});
