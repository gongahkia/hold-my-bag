import express from 'express'
import { getUserProfile, updateUserProfile } from '../controllers/userController'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

router.get('/profile', authenticateToken, getUserProfile)
router.put('/profile', authenticateToken, updateUserProfile)

export default router
