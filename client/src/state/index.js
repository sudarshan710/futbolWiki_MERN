import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  players: [],
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setfavPlayers: (state, action) => {
      if (state.user) {
        state.user.favPlayers = action.payload.favPlayers;
      } else {
        console.error("user fav players do not exist!");
      }
    },
    addFavoritePlayer: (state, action) => {
      if (state.user) {
        state.user.favPlayers.push(action.payload);
      }
    },
    setPlayers: (state, action) => {
      state.players = action.payload.players;
    },
    setPlayer: (state, action) => {
      const updatedPlayers = state.players.map((player) => {
        if (player._id === action.payload.player_id) return action.payload.player;
        return player;
      });
      state.players = updatedPlayers;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setPlayer,
  setPlayers,
  setfavPlayers,
  addFavoritePlayer,
} = authReducer.actions;

export default authReducer.reducer;
