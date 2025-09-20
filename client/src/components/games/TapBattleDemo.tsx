import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TapBattleDemo: React.FC = () => {
  const [taps, setTaps] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(true)
  const [leaderboard] = useState([
    { user: { nickname: 'Alice' }, score: 156 },
    { user: { nickname: 'Bob' }, score: 142 },
    { user: { nickname: 'You' }, score: taps }
  ])

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameActive(false)
    }
  }, [timeLeft, gameActive])

  const handleTap = () => {
    if (gameActive) {
      setTaps(prev => prev + 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">👆 Tap Battle</h2>
          <p className="text-gray-600">Tap as fast as you can!</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-primary-600">
            ⏱️ {timeLeft}s
          </div>
          <div className="text-2xl font-bold text-green-600">
            Taps: {taps}
          </div>
        </div>

        <motion.button
          className="w-full h-64 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl text-white text-6xl font-bold shadow-lg"
          onClick={handleTap}
          disabled={!gameActive}
          whileHover={{ scale: gameActive ? 1.02 : 1 }}
          whileTap={{ scale: gameActive ? 0.95 : 1 }}
          animate={gameActive ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.5, repeat: gameActive ? Infinity : 0 }}
        >
          {gameActive ? 'TAP!' : 'Game Over!'}
        </motion.button>

        <div className="bg-gray-50 rounded-xl p-4 mt-6">
          <h3 className="font-semibold mb-3">🏆 Leaderboard</h3>
          <div className="space-y-2">
            {leaderboard
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </span>
                    <span className="font-medium">{player.user.nickname}</span>
                  </div>
                  <span className="text-primary-600 font-bold">{player.score}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TapBattleDemo