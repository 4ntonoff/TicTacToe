import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type SquareValue = "X" | "O" | null;

interface GameState {
  squares: SquareValue[];
  xIsNext: boolean;
  winner: SquareValue | "Draw" | null;
  scores: { X: number; O: number };
}

const initialState: GameState = {
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
  scores: { X: 0, O: 0 },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSquare: (
      state,
      action: PayloadAction<{ index: number; value: SquareValue }>
    ) => {
      const { index, value } = action.payload;
      state.squares[index] = value;
    },
    setXIsNext: (state, action: PayloadAction<boolean>) => {
      state.xIsNext = action.payload;
    },
    setWinner: (state, action: PayloadAction<SquareValue | "Draw" | null>) => {
      state.winner = action.payload;
      if (action.payload === "X") {
        state.scores.X += 1;
      } else if (action.payload === "O") {
        state.scores.O += 1;
      }
    },
    resetGame: (state) => {
      state.squares = Array(9).fill(null);
      state.xIsNext = true;
      state.winner = null;
    },
    resetScores: (state) => {
      state.scores = { X: 0, O: 0 };
    },
  },
});

export const { setSquare, setXIsNext, setWinner, resetGame, resetScores } =
  gameSlice.actions;

export const selectSquares = (state: RootState) => state.game.squares;
export const selectXIsNext = (state: RootState) => state.game.xIsNext;
export const selectWinner = (state: RootState) => state.game.winner;
export const selectScores = (state: RootState) => state.game.scores;

export default gameSlice.reducer;
