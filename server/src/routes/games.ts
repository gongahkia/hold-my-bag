import express from 'express'
import { startGame, endGame, submitScore, getLeaderboard } from '../controllers/gameController'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

router.post('/start', authenticateToken, startGame)
router.put('/end/:gameId', authenticateToken, endGame)
router.post('/score', authenticateToken, submitScore)
router.get('/leaderboard/:gameId', getLeaderboard)

export default router
