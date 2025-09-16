import React from "react";
import { useParams } from "react-router-dom";

const GameRoom: React.FC = () => {
  const { roomCode } = useParams<{ roomCode: string }>();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Game Room</h2>
      <p>Room Code: <strong>{roomCode}</strong></p>
      <div style={{ marginTop: "1rem" }}>
        {/* Render lobby, game component, or room stats here */}
        <div>Loading game lobby...</div>
      </div>
    </div>
  );
};

export default GameRoom;
