import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "../types/game";

const initialState: GameState = {
  currentRoom: null,
  currentGame: null,
  playerScore: 0,
  leaderboard: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setRoom(state, action: PayloadAction<string | null>) {
      state.currentRoom = action.payload;
    },
    setGame(state, action: PayloadAction<string | null>) {
      state.currentGame = action.payload;
    },
    setScore(state, action: PayloadAction<number>) {
      state.playerScore = action.payload;
    },
    setLeaderboard(state, action: PayloadAction<any[]>) {
      state.leaderboard = action.payload;
    },
    resetGame(state) {
      state.currentGame = null;
      state.playerScore = 0;
    },
  },
});

export const { setRoom, setGame, setScore, setLeaderboard, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
