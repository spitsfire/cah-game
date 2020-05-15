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

const uid = new ShortUniqueId();

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
    const puid = uid();
    db.collection("players")
      .doc(puid)
      .set({
        points: 0,
        hand: [],
        name: name,
      })
      .then(() => {
        const ruid = uid();
        db.collection("rooms")
          .doc(ruid)
          .set({
            currentRound: {
              czar: null,
              blackCard: null,
              choices: [],
              round: null,
            },
            capacity: parseInt(cap),
            rounds: parseInt(rounds),
            hasStarted: false,
            players: [puid],
            deck: {},
            host: puid,
          })
          .then(() => {
            localStorage.setItem("puid", puid);
            localStorage.setItem("ruid", ruid);
            navigate("/room/" + ruid);
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
