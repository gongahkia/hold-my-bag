import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { mockColorMatchGame, mockUsers } from '../../data/mockData'

const ColorMatchDemo: React.FC = () => {
  const [currentGame, setCurrentGame] = useState(mockColorMatchGame)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGame(prev => ({
        ...prev,
        timeLeft: Math.max(0, prev.timeLeft - 1)
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    const isCorrect = color === currentGame.targetColor

    if (isCorrect) {
      setScore(prev => prev + 10)
      setFeedback('🎉 Correct!')
    } else {
      setFeedback('❌ Wrong color!')
    }

    setTimeout(() => {
      setFeedback(null)
      setSelectedColor(null)
      // Simulate next round
      setCurrentGame(prev => ({
        ...prev,
        currentRound: prev.currentRound + 1,
        timeLeft: 15,
        targetColor: prev.colorOptions[Math.floor(Math.random() * prev.colorOptions.length)]
      }))
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">🎨 Color Match</h2>
          <p className="text-gray-600">Match the target color as quickly as possible!</p>
        </div>

        {/* Game Progress */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Round {currentGame.currentRound} / {currentGame.totalRounds}
          </div>
          <div className="text-2xl font-bold text-primary-600">
            ⏱️ {currentGame.timeLeft}s
          </div>
          <div className="text-sm text-gray-600">
            Score: {score}
          </div>
        </div>

        {/* Target Color */}
        <div className="text-center mb-8">
          <p className="text-lg font-medium mb-4">Match this color:</p>
          <motion.div
            className="w-32 h-32 mx-auto rounded-2xl shadow-lg"
            style={{ backgroundColor: currentGame.targetColor }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Color Options */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {currentGame.colorOptions.map((color, index) => (
            <motion.button
              key={index}
              className="w-full h-20 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              disabled={selectedColor !== null}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={selectedColor === color ? { scale: [1, 1.1, 1] } : {}}
            />
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <motion.div
            className="text-center text-2xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {feedback}
          </motion.div>
        )}

        {/* Leaderboard */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold mb-3">🏆 Leaderboard</h3>
          <div className="space-y-2">
            {currentGame.leaderboard.map((player, index) => (
              <div key={player.user.id} className="flex items-center justify-between">
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

export default ColorMatchDemo