import React, { useState } from "react";
import QRScanner from "../components/common/QRScanner";

const JoinGame: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Join Game Room</h2>
      {!result ? (
        <QRScanner onResult={setResult} />
      ) : (
        <div>
          <p>Room Code: <strong>{result}</strong></p>
          <button onClick={() => window.location.href = `/room/${result}`}>Enter Room</button>
        </div>
      )}
    </div>
  );
};

export default JoinGame;
