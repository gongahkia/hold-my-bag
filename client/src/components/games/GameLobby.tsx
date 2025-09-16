import React from "react";
import GameCard from "./GameCard";
import Leaderboard from "./Leaderboard";

interface Game {
  id: string;
  name: string;
  description: string;
  players: number;
  status: string;
}

interface GameLobbyProps {
  games: Game[];
  onJoin: (gameId: string) => void;
}

const GameLobby: React.FC<GameLobbyProps> = ({ games, onJoin }) => (
  <div style={{ padding: '1rem', maxWidth: 550, margin: "auto" }}>
    <h2>Game Lobby</h2>
    <div>
      {games.map(game => (
        <GameCard
          key={game.id}
          game={game}
          onJoin={() => onJoin(game.id)}
        />
      ))}
    </div>
    <Leaderboard />
  </div>
);

export default GameLobby;
