import React, { useState } from "react";
import "./App.css";

type SquareValue = "X" | "O" | null;

const initialBoard: SquareValue[] = Array(9).fill(null);

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
  const [squares, setSquares] = useState<SquareValue[]>(initialBoard);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<SquareValue | null>(null);

  const handleClick = (i: number): void => {
    if (winner || squares[i]) return;

    const newSquares: SquareValue[] = [...squares];
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
      setTimeout(() => {
        setSquares(initialBoard);
        //Set the timeout before the game resets
        setWinner(null);
      }, 5000);
    }
  };

  const isBoardDisabled = (isXNext: boolean): boolean =>
    (isXNext && !xIsNext) || (!isXNext && xIsNext);

  const renderSquare = (i: number, isXNext: boolean): JSX.Element => (
    <button
      className="gametable-item"
      onClick={() => handleClick(i)}
      disabled={isBoardDisabled(isXNext) || !!squares[i]}
    >
      {squares[i]}
    </button>
  );

  const resetGame = (): void => {
    setSquares(initialBoard);
    setWinner(null);
    console.log("Game reset");
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;
  return (
    <div className="App">
      <div className="game">
        <div className="heading">
          <span className="player primary-text">Player 1</span>
          <div className="score">
            <div className="score-text">Score: 0:0</div>
            <button onClick={resetGame} className="reset-button">
              Reset
            </button>
          </div>
          <span className="player">Player 2</span>
        </div>
        <div className="main">
          <div className="player-content">
            <span className="status primary-text">{status}</span>
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
            {/* TODO status change */}
            <span className="status primary-text">{status}</span>
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
