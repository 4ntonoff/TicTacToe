// gameSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type SquareValue = "X" | "O" | null;

const initialState: {
  squares: SquareValue[];
  xIsNext: boolean;
  winner: SquareValue | "Draw" | null;
} = {
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
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
    },
    resetGame: (state) => {
      state.squares = Array(9).fill(null);
      state.xIsNext = true;
      state.winner = null;
    },
  },
});

export const { setSquare, setXIsNext, setWinner, resetGame } =
  gameSlice.actions;

export const selectSquares = (state: RootState) => state.game.squares;
export const selectXIsNext = (state: RootState) => state.game.xIsNext;
export const selectWinner = (state: RootState) => state.game.winner;

export default gameSlice.reducer;
