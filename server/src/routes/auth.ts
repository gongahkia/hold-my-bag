import express from 'express'
import { createUser, validateToken } from '../controllers/authController'

const router = express.Router()

router.post('/register', createUser)
router.post('/validate', validateToken)

export default router
