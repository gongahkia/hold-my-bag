import React from "react";
import { motion } from "framer-motion";
import { mockUsers, mockPlayerStats, mockGameHistory, mockAchievements } from "../data/mockData";
import { Trophy, Target, Users, Clock } from "lucide-react";

const Profile: React.FC = () => {
  const user = mockUsers[0];
  const stats = mockPlayerStats[user.id];
  const recentGames = mockGameHistory.slice(0, 3);

  return (
    <div className="min-h-screen py-8 px-4" style={{backgroundColor: '#f0f9ff'}}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-white font-bold">
              {user.nickname[0].toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold gradient-text">{user.nickname}</h1>
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mt-2">
              <Trophy size={16} />
              <span>{stats.rank} Rank</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center bg-blue-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-600">{stats.gamesPlayed}</div>
              <div className="text-sm text-gray-600">Games Played</div>
            </div>
            <div className="text-center bg-green-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-600">{stats.gamesWon}</div>
              <div className="text-sm text-gray-600">Wins</div>
            </div>
            <div className="text-center bg-purple-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-600">{Math.round(stats.winRate * 100)}%</div>
              <div className="text-sm text-gray-600">Win Rate</div>
            </div>
            <div className="text-center bg-orange-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-orange-600">{stats.totalPoints}</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Trophy className="text-yellow-500" />
              <span>Achievements</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mockAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 ${
                    achievement.earned
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <div className="font-semibold text-sm">{achievement.name}</div>
                  <div className="text-xs text-gray-600">{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Games */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Clock className="text-blue-500" />
              <span>Recent Games</span>
            </h3>
            <div className="space-y-3">
              {recentGames.map((game) => (
                <div key={game.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {game.gameType === 'colorMatch' ? '🎨' :
                         game.gameType === 'tapBattle' ? '👆' : '🧠'}
                      </span>
                      <div>
                        <div className="font-semibold">
                          {game.gameType === 'colorMatch' ? 'Color Match' :
                           game.gameType === 'tapBattle' ? 'Tap Battle' : 'Trivia Blitz'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {game.players.length} players • {game.roomCode}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${
                        game.winner.id === user.id ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {game.winner.id === user.id ? '🥇 Won' : '📊 Played'}
                      </div>
                      <div className="text-sm text-gray-600">
                        Score: {game.score[user.id]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
