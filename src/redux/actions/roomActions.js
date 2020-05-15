import {
  ADD_ROOM,
  GET_ROOM,
  CHECK_ROOM,
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
const white = require("../../assets/data/whiteCards");
const black = require("../../assets/data/blackCards");

const uid = new ShortUniqueId();

// LOCAL FUNCTIONS
const shuffle = (cards) => {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

const grabBlack = (room) => {
  let card = room.deck.blackCards[room.deck.blackCards.length - 1];
  let cards = room.deck.blackCards.slice();
  cards.length = cards.length - 1;
  return [card, cards];
};
const dealWhite = (room) => {
  let count = 0;
  let whiteCards = room.deck.whiteCards.slice();
  let players = room.players.slice();
  for (let player of players) {
    console.log("One player", player);
    console.log("Player's hand", player.hand.length);
    while (player.hand.length < 10) {
      player.hand.push(whiteCards.pop());
      count++;
    }
  }
  whiteCards.length -= count;
  return [players, whiteCards];
};

// EXPORTS
export const checkCode = (code) => async (dispatch) => {
  if (code !== "") {
    const room = await db.collection("rooms").doc(code).get();
    dispatch({
      type: CHECK_ROOM,
      payload: room.exists,
    });
  }
};
git;
export const getRoom = (id) => async (dispatch) => {
  try {
    const room = await db.collection("rooms").doc(id).get();
    dispatch({
      type: GET_ROOM,
      payload: room.data(),
    });
  } catch (err) {
    dispatch({
      type: CATCH_ERR,
      payload: err,
    });
  }
};

export const createRoom = ({ name, cap, rounds }) => async (dispatch) => {
  try {
    const puid = uid();
    db.collection("players")
      .doc(puid)
      .set({
        points: 0,
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
            deck: {
              whiteCards: shuffle(white),
              blackCards: shuffle(black),
            },
            host: puid,
          })
          .then(async () => {
            localStorage.setItem("puid", puid);
            localStorage.setItem("ruid", ruid);
            const player = await db.collection("players").doc(puid).get();
            const room = await db.collection("rooms").doc(ruid).get();
            dispatch({
              type: ADD_ROOM,
              payload: { player: player.data(), room: room.data() },
            });
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

export const joinRoom = (name, code) => async (dispatch) => {
  try {
    const room = await db.collection("rooms").doc(code).get();
    if (room.hasStarted) throw "Game has already started.";
    const puid = uid();
    db.collection("players")
      .doc(puid)
      .set({
        points: 0,
        name: name,
      })
      .then(async () => {
        localStorage.setItem("puid", puid);
        localStorage.setItem("ruid", code);
        const player = await db.collection("players").doc(puid).get();
        dispatch({
          type: ADD_ROOM,
          payload: { player: player.data(), room: room.data() },
        });
        navigate("/room/" + code);
      });
  } catch (err) {
    dispatch({
      type: CATCH_ERR,
      payload: err,
    });
  }
};
export const startGame = () => async (dispatch) => {
  const room = await db
    .collection("rooms")
    .doc(localStorage.getItem("ruid"))
    .update({
      deck: { whiteCards: "", blackCards: "" },
    });
};
export const resetRoom = () => (dispatch) => {
  dispatch({
    type: RESET_ROOM,
  });
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
