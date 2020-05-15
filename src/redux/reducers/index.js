import { combineReducers } from "redux";
import playerReducer from "./playerReducer";
import roomReducer from "./roomReducer";

export default combineReducers({
  playerReducer: playerReducer,
  roomReducer: roomReducer,
});
