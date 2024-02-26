import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetGame,
  selectSquares,
  selectWinner,
  selectXIsNext,
  setSquare,
  setWinner,
  setXIsNext,
  selectScores,
} from "./gameSlice";
import "./App.css";

type SquareValue = "X" | "O" | null;

const calculateWinner = (squares: SquareValue[]): SquareValue | null => {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function App() {
  const dispatch = useDispatch();
  const squares = useSelector(selectSquares);
  const xIsNext = useSelector(selectXIsNext);
  const winner = useSelector(selectWinner);
  const scores = useSelector(selectScores);

  const handleClick = (i: number): void => {
    if (winner || squares[i]) return;

    const newSquares: SquareValue[] = [...squares];
    newSquares[i] = xIsNext ? "X" : "O";
    dispatch(setSquare({ index: i, value: newSquares[i] }));

    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) {
      dispatch(setWinner(gameWinner));
      setTimeout(() => {
        dispatch(resetGame());
      }, 5000);
    } else if (!newSquares.includes(null)) {
      dispatch(setWinner("Draw"));
      setTimeout(() => {
        dispatch(resetGame());
      }, 5000);
    } else {
      dispatch(setXIsNext(!xIsNext));
    }
  };

  const isBoardDisabled = (isXNext: boolean): boolean =>
    (isXNext && !xIsNext) || (!isXNext && xIsNext);

  const getStatus = (
    isXNext: boolean,
    winner: SquareValue | "Draw" | null
  ): string => {
    if (winner === "Draw") {
      return "Draw";
    } else if (winner) {
      return "You " + (isXNext ? "win" : "lose") + "!";
    } else {
      return isXNext ? "Your turn" : "Not your turn";
    }
  };

  const renderSquare = (i: number, isXNext: boolean): JSX.Element => (
    <button
      className="gametable-item"
      onClick={() => handleClick(i)}
      disabled={isBoardDisabled(isXNext) || !!squares[i]}
    >
      {squares[i]}
    </button>
  );

  return (
    <div className="App">
      <div className="game">
        <div className="heading">
          <span className="player primary-text">Player X</span>
          <div className="score">
            <div className="score-text">
              Score: {scores.X}:{scores.O}
            </div>{" "}
            <button
              onClick={() => dispatch(resetGame())}
              className="reset-button"
            >
              Reset
            </button>
          </div>
          <span className="player">Player O</span>
        </div>
        <div className="main">
          <div className="player-content">
            <span className="status primary-text">
              {getStatus(xIsNext, winner)}
            </span>
            <div className="gametable-container">
              <div className="gametable-row">
                {renderSquare(0, true)}
                {renderSquare(1, true)}
                {renderSquare(2, true)}
              </div>
              <div className="gametable-row">
                {renderSquare(3, true)}
                {renderSquare(4, true)}
                {renderSquare(5, true)}
              </div>
              <div className="gametable-row">
                {renderSquare(6, true)}
                {renderSquare(7, true)}
                {renderSquare(8, true)}
              </div>
            </div>
          </div>
          <div className="player-content">
            <span className="status primary-text">
              {getStatus(!xIsNext, winner)}
            </span>
            <div className="gametable-container">
              <div className="gametable-row">
                {renderSquare(0, false)}
                {renderSquare(1, false)}
                {renderSquare(2, false)}
              </div>
              <div className="gametable-row">
                {renderSquare(3, false)}
                {renderSquare(4, false)}
                {renderSquare(5, false)}
              </div>
              <div className="gametable-row">
                {renderSquare(6, false)}
                {renderSquare(7, false)}
                {renderSquare(8, false)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
