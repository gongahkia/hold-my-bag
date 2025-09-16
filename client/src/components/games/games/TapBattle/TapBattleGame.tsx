import React, { useState, useEffect } from "react";
import TapButton from "./TapButton";
import { TapBattleState } from "./TapBattleTypes";

const GAME_SECONDS = 10;

const TapBattleGame: React.FC = () => {
  const [state, setState] = useState<TapBattleState>({
    score: 0,
    timeLeft: GAME_SECONDS,
    running: false
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.running && state.timeLeft > 0) {
      timer = setTimeout(() => {
        setState(s => ({
          ...s,
          timeLeft: s.timeLeft - 1
        }));
      }, 1000);
    } else if (state.timeLeft === 0 && state.running) {
      setState(s => ({ ...s, running: false }));
    }
    return () => clearTimeout(timer);
  }, [state.running, state.timeLeft]);

  const startGame = () => setState({ score: 0, timeLeft: GAME_SECONDS, running: true });

  const handleTap = () => setState(s => ({ ...s, score: s.score + 1 }));

  const resetGame = () => setState({ score: 0, timeLeft: GAME_SECONDS, running: false });

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h3>Tap Battle</h3>
      {state.running ? (
        <>
          <div>Time left: {state.timeLeft}s</div>
          <div>Score: {state.score}</div>
          <TapButton onTap={handleTap} disabled={state.timeLeft === 0} />
        </>
      ) : (
        <>
          <div>Score: {state.score}</div>
          <button onClick={startGame} style={{
            margin: "1rem",
            background: "#000", color: "#fff",
            border: "none", padding: "0.5em 1em", borderRadius: "8px"
          }} disabled={state.running}>Start</button>
          <button onClick={resetGame} style={{
            background: "#000", color: "#fff", border: "none", padding: "0.5em 1em", borderRadius: "8px"
          }}>Reset</button>
        </>
      )}
      {state.timeLeft === 0 && !state.running && <div><strong>Game Over!</strong></div>}
    </div>
  );
};

export default TapBattleGame;
