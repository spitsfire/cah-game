import {
  GET_ROOMS,
  GET_ROOM,
  ADD_ROOM,
  START_GAME,
  SET_ROUND,
  DISABLE_ROOM,
  RESET_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
  SET_LOADING,
  CATCH_ERR,
} from "./../types";
import { db } from "../../services/firebase";
import ShortUniqueId from "short-unique-id";
import { navigate } from "@reach/router";

// export const getRooms = () => async (dispatch) => {
//   try {
//     console.log(res);

//     dispatch({
//       type: GET_ROOMS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: CATCH_ERR,
//       payload: err,
//     });
//   }
// };

export const createRoom = ({ name, cap, rounds }) => (dispatch) => {
  try {
    const puid = new ShortUniqueId();
    db.ref("players/" + puid)
      .set({
        points: 0,
        hand: [],
        name: name,
      })
      .then((player) => {
        const ruid = new ShortUniqueId();
        db.ref("rooms/" + ruid)
          .set({
            currentRound: {
              czar: null,
              blackCard: null,
              choices: [],
              round: rounds,
            },
            capacity: cap,
            rounds: rounds,
            hasStarted: false,
            players: [player],
            deck: {},
            host: puid,
          })
          .then((room) => {
            console.log("NEW ROOM", room);
            localStorage.setItem("puid", puid);
            localStorage.setItem("ruid", ruid);
          });
      });
  } catch (err) {
    dispatch({
      type: CATCH_ERR,
      payload: err,
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
