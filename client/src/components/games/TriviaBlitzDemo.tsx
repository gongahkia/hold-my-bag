import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TriviaBlitzDemo: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correct: 1
    },
    {
      question: "What is 15 × 8?",
      options: ["110", "120", "125", "130"],
      correct: 1
    }
  ]

  const leaderboard = [
    { user: { nickname: 'Alice' }, score: 250 },
    { user: { nickname: 'Bob' }, score: 180 },
    { user: { nickname: 'You' }, score: score }
  ]

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showFeedback) {
      handleAnswer(-1) // Time's up
    }
  }, [timeLeft, showFeedback])

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    const isCorrect = answerIndex === questions[currentQuestion].correct
    if (isCorrect) {
      setScore(prev => prev + Math.max(10, timeLeft * 5))
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
        setTimeLeft(15)
      }
    }, 2000)
  }

  const question = questions[currentQuestion]
  const isGameComplete = currentQuestion >= questions.length - 1 && showFeedback

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">🧠 Trivia Blitz</h2>
          <p className="text-gray-600">Answer questions as fast as you can!</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} / {questions.length}
          </div>
          <div className="text-2xl font-bold text-primary-600">
            ⏱️ {timeLeft}s
          </div>
          <div className="text-sm text-gray-600">
            Score: {score}
          </div>
        </div>

        {!isGameComplete ? (
          <>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-center mb-6">
                {question.question}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 rounded-lg text-left transition-colors ${
                      selectedAnswer === null
                        ? 'bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'
                        : selectedAnswer === index
                        ? index === question.correct
                          ? 'bg-green-100 border-2 border-green-300'
                          : 'bg-red-100 border-2 border-red-300'
                        : index === question.correct
                        ? 'bg-green-100 border-2 border-green-300'
                        : 'bg-gray-100 border-2 border-gray-200'
                    }`}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            {showFeedback && (
              <motion.div
                className="text-center text-2xl font-bold mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {selectedAnswer === question.correct ? '🎉 Correct!' : '❌ Wrong!'}
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-green-600 mb-4">🎉 Game Complete!</h3>
            <p className="text-xl">Final Score: {score}</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-4">
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

export default TriviaBlitzDemo