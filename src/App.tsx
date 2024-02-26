import { useDispatch, useSelector } from "react-redux";
import { selectScores, resetScores } from "./gameSlice";
import "./App.css";
import Gametable from "./components/gametable";
import Chat from "./components/chat";

function App() {
  const dispatch = useDispatch();
  const scores = useSelector(selectScores);

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
              onClick={() => dispatch(resetScores())}
              className="reset-button"
            >
              Reset
            </button>
          </div>
          <span className="player">Player O</span>
        </div>
        <div className="main">
          <div className="player-content">
            <Gametable isFirst />

            <Chat player={"X"} />
          </div>
          <div className="player-content">
            <Gametable isFirst={false} />

            <Chat player={"O"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
