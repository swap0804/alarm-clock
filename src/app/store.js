import { configureStore } from "@reduxjs/toolkit";
import clockReducer from "./components/ClockSlice";

export default configureStore({
  reducer: {
    clock: clockReducer,
  },
});
