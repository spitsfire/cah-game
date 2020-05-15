import {
  ADD_ROOM,
  GET_ROOM,
  START_GAME,
  SET_ROUND,
  DISABLE_ROOM,
  RESET_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
  SET_LOADING,
  CATCH_ERR,
} from "./../types";

const initialState = {
  room: {},
  currentCzar: null,
  loading: false,
  round: null,
  blackCard: null,
  players: [],
  err: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATCH_ERR:
      return {
        ...state,
        err: action.payload,
      };
    case GET_ROOM:
      return {
        ...state,
        room: action.payload,
      };
    case ADD_ROOM:
      return {
        ...state,
        room: action.payload.room,
        players: [...state.players, action.payload.player],
      };
    default:
      return state;
  }
};
