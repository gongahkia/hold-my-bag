import express from 'express'
import { createRoom, joinRoom, getRoomStatus } from '../controllers/roomController'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

router.post('/create', authenticateToken, createRoom)
router.get('/join/:code', authenticateToken, joinRoom)
router.get('/status/:code', getRoomStatus)

export default router
