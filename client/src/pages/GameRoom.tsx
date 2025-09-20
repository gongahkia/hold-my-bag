import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ColorMatchDemo from "../components/games/ColorMatchDemo";
import TapBattleDemo from "../components/games/TapBattleDemo";
import TriviaBlitzDemo from "../components/games/TriviaBlitzDemo";
import { mockRooms, mockUsers, mockGameTypes } from "../data/mockData";

const GameRoom: React.FC = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const [gameStarted, setGameStarted] = useState(false);

  const room = mockRooms.find(r => r.code === roomCode) || mockRooms[0];
  const gameType = mockGameTypes.find(g => g.id === room.gameType) || mockGameTypes[0];

  if (gameStarted) {
    switch (room.gameType) {
      case 'colorMatch':
        return <ColorMatchDemo />;
      case 'tapBattle':
        return <TapBattleDemo />;
      case 'triviaBlitz':
        return <TriviaBlitzDemo />;
      default:
        return <ColorMatchDemo />;
    }
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{backgroundColor: '#f0f9ff'}}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">🎮 Game Room</h1>
            <div className="text-2xl font-mono bg-primary-100 text-primary-800 px-4 py-2 rounded-lg inline-block">
              {room.code}
            </div>
            <p className="text-gray-600 mt-2">Share this code with friends to join!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Game Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center space-x-2">
                <span>{gameType.icon}</span>
                <span>{gameType.name}</span>
              </h3>
              <p className="text-gray-600">{gameType.description}</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">👥 2-6 Players</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">⏱️ 2-3 minutes</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">🎯 Skill-based</span>
              </div>
            </div>

            {/* Players */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                👥 Players ({room.players.length}/{room.maxPlayers})
              </h3>
              <div className="space-y-2">
                {room.players.map((player, index) => (
                  <div key={player.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {index === 0 ? '👑' : '👤'}
                      </span>
                      <span className="font-medium">{player.nickname}</span>
                      {index === 0 && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Host</span>}
                    </div>
                    <span className="text-green-500 text-sm">● Ready</span>
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: room.maxPlayers - room.players.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="flex items-center bg-gray-50 rounded-lg p-3 opacity-50">
                    <span className="text-gray-400">🔓 Waiting for player...</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={() => setGameStarted(true)}
              className="btn-primary px-8 py-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Start Game Demo
            </motion.button>
            <motion.button
              className="btn-outline px-8 py-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📋 Copy Room Code
            </motion.button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            💡 This is a demo showing HoldMyBag's gameplay features
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameRoom;
