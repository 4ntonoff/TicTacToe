import {
  selectSquares,
  selectWinner,
  resetGame,
  selectXIsNext,
  setSquare,
  setWinner,
  setXIsNext,
  selectScores,
} from "../gameSlice";
import { useDispatch, useSelector } from "react-redux";

interface ChatProps {
  isFirst: boolean;
}
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

const Gametable: React.FC<ChatProps> = ({ isFirst }) => {
  const dispatch = useDispatch();
  const squares = useSelector(selectSquares);
  const xIsNext = useSelector(selectXIsNext);
  const winner = useSelector(selectWinner);
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
      return isXNext ? "Your turn" : "Wait your opponent";
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
    <>
      <span className="status primary-text">{getStatus(xIsNext, winner)}</span>
      <div className="gametable-container">
        <div className="gametable-row">
          {renderSquare(0, isFirst)}
          {renderSquare(1, isFirst)}
          {renderSquare(2, isFirst)}
        </div>
        <div className="gametable-row">
          {renderSquare(3, isFirst)}
          {renderSquare(4, isFirst)}
          {renderSquare(5, isFirst)}
        </div>
        <div className="gametable-row">
          {renderSquare(6, isFirst)}
          {renderSquare(7, isFirst)}
          {renderSquare(8, isFirst)}
        </div>
      </div>
    </>
  );
};

export default Gametable;
