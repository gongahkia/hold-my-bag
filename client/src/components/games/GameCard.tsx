import React from "react";

interface GameCardProps {
  game: {
    id: string;
    name: string;
    description: string;
    players: number;
    status: string;
  };
  onJoin: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onJoin }) => (
  <div style={{
    border: "1px solid #000",
    borderRadius: 8,
    margin: "1rem 0",
    padding: "1rem",
    background: "#fff"
  }}>
    <h3 style={{ margin: "0 0 0.5rem" }}>{game.name}</h3>
    <p>{game.description}</p>
    <span>Players: {game.players}</span><br />
    <span>Status: {game.status}</span><br />
    <button onClick={onJoin} style={{
      marginTop: "0.7rem",
      background: "#000",
      color: "#fff",
      border: "none",
      padding: "0.5em 1em",
      borderRadius: 4,
      cursor: "pointer"
    }}>Join Game</button>
  </div>
);

export default GameCard;
