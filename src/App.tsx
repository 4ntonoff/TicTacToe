import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="game">
        <div className="heading">
          <span className="player primary-text">Player 1</span>
          <div className="score">
            {/* TODO score*/}
            <div className="score-text">Score: 0:0</div>
            <button className="reset-button">Reset</button>
          </div>
          <span className="player">Player 2</span>
        </div>
        <div className="main">
          <div className="player-content">
            <span className="status primary-text">You win!</span>
            <div className="gametable-container">
              <div className="gametable-row">
                <div className="gametable-item" id="11">
                  1
                </div>
                <div className="gametable-item" id="12">
                  2
                </div>
                <div className="gametable-item" id="13">
                  3
                </div>
              </div>
              <div className="gametable-row">
                <div className="gametable-item" id="14">
                  4
                </div>
                <div className="gametable-item" id="15">
                  5
                </div>
                <div className="gametable-item" id="16">
                  6
                </div>
              </div>
              <div className="gametable-row">
                <div className="gametable-item" id="17">
                  7
                </div>
                <div className="gametable-item" id="18">
                  8
                </div>
                <div className="gametable-item" id="19">
                  9
                </div>
              </div>
            </div>
          </div>
          <div className="player-content">
            <span className="status primary-text">You win!</span>
            <div className="gametable-container">
              <div className="gametable-row">
                <div className="gametable-item" id="21">
                  1
                </div>
                <div className="gametable-item" id="22">
                  2
                </div>
                <div className="gametable-item" id="23">
                  3
                </div>
              </div>
              <div className="gametable-row">
                <div className="gametable-item" id="24">
                  4
                </div>
                <div className="gametable-item" id="25">
                  5
                </div>
                <div className="gametable-item" id="26">
                  6
                </div>
              </div>
              <div className="gametable-row">
                <div className="gametable-item" id="27">
                  7
                </div>
                <div className="gametable-item" id="28">
                  8
                </div>
                <div className="gametable-item" id="29">
                  9
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
