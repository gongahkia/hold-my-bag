import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { RootState } from '../store'
import { setCredentials, setLoading } from '../store/authSlice'
import { authAPI, roomAPI } from '../services/api'
import {
  Play,
  Users,
  Zap,
  Gamepad2,
  QrCode,
  PlusCircle,
  ArrowRight,
  Star,
  Trophy,
  Clock
} from 'lucide-react'
import LoadingSpinner from '../components/common/LoadingSpinner'

const gameTypes = [
  { id: 'colorMatch', name: 'Color Match', icon: '🎨', description: 'Match colors as fast as you can!' },
  { id: 'quickDraw', name: 'Quick Draw', icon: '✏️', description: 'Draw and guess in real-time' },
  { id: 'snakeRoyale', name: 'Snake Royale', icon: '🐍', description: 'Battle royale with snakes' },
  { id: 'tapBattle', name: 'Tap Battle', icon: '👆', description: 'Tap faster than your friends' },
  { id: 'triviaBlitz', name: 'Trivia Blitz', icon: '🧠', description: 'Quick trivia questions' },
  { id: 'wordChain', name: 'Word Chain', icon: '🔗', description: 'Build word chains together' }
]

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth)


  const [nickname, setNickname] = useState('')
  const [selectedGame, setSelectedGame] = useState('colorMatch')
  const [creatingRoom, setCreatingRoom] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickname.trim()) return

    dispatch(setLoading(true))
    try {
      const result = await authAPI.register(nickname.trim())
      dispatch(setCredentials(result))
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleCreateRoom = async () => {
    if (!isAuthenticated) return

    setCreatingRoom(true)
    try {
      const result = await roomAPI.create(selectedGame, 6)
      navigate(`/room/${result.room.code}`)
    } catch (error) {
      console.error('Failed to create room:', error)
    } finally {
      setCreatingRoom(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{backgroundColor: '#f0f9ff', minHeight: '100vh'}}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gamepad2 size={40} className="text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold gradient-text mb-2">HoldMyBag</h1>
            <p className="text-gray-600">Quick party games for when you're waiting around!</p>
          </div>

          <div className="card">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose your nickname
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="input"
                  placeholder="Enter a fun nickname..."
                  maxLength={20}
                  disabled={isLoading}
                />
              </div>
              <motion.button
                type="submit"
                className="btn-primary w-full"
                disabled={isLoading || !nickname.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? <LoadingSpinner size="small" /> : (
                  <>
                    <Play size={18} />
                    Let's Play!
                  </>
                )}
              </motion.button>
            </form>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <Zap className="text-primary-600" size={24} />
              </div>
              <p className="text-xs text-gray-600">Quick Games</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <Users className="text-secondary-600" size={24} />
              </div>
              <p className="text-xs text-gray-600">Multiplayer</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <Trophy className="text-green-600" size={24} />
              </div>
              <p className="text-xs text-gray-600">Competitive</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{backgroundColor: '#f0f9ff', minHeight: '100vh'}}>
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Welcome back, {user?.nickname}! 👋
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ready to start a quick gaming session?
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Create Room */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-hover"
          >
            <div className="flex items-center space-x-3 mb-4">
              <PlusCircle className="text-primary-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Create Room</h2>
            </div>
            <p className="text-gray-600 mb-6">Start a new game room and invite friends to join!</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a game:
                </label>
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="input"
                >
                  {gameTypes.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.icon} {game.name}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                onClick={handleCreateRoom}
                className="btn-primary w-full"
                disabled={creatingRoom}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {creatingRoom ? <LoadingSpinner size="small" /> : (
                  <>
                    <PlusCircle size={18} />
                    Create Room
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Join Room */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-hover"
          >
            <div className="flex items-center space-x-3 mb-4">
              <QrCode className="text-secondary-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Join Room</h2>
            </div>
            <p className="text-gray-600 mb-6">Have a room code? Jump right into the action!</p>

            <motion.button
              onClick={() => navigate('/join')}
              className="btn-secondary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <QrCode size={18} />
              Join with Code
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>

        {/* Available Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Available Games</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameTypes.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="card-hover cursor-pointer"
                onClick={() => setSelectedGame(game.id)}
                whileHover={{ y: -5 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{game.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{game.name}</h3>
                  <p className="text-gray-600 text-sm">{game.description}</p>
                  {selectedGame === game.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-3"
                    >
                      <div className="inline-flex items-center space-x-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                        <Star size={14} />
                        <span>Selected</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
