import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import prisma from '../config/database'
import { config } from '../config/environment'
import { createError } from '../middleware/errorHandler'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nickname } = req.body

    if (!nickname || nickname.trim().length === 0) {
      throw createError('Nickname is required', 400)
    }

    if (nickname.length > 20) {
      throw createError('Nickname must be 20 characters or less', 400)
    }

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        nickname: nickname.trim(),
      }
    })

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '24h' })

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    })

    res.status(201).json({
      user: {
        id: user.id,
        nickname: user.nickname
      },
      token
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

export const validateToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    if (!token) {
      throw createError('Token is required', 400)
    }

    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, nickname: true }
    })

    if (!user) {
      throw createError('Invalid token', 401)
    }

    res.json({ user, valid: true })
  } catch (error) {
    res.status(error.statusCode || 401).json({ error: error.message, valid: false })
  }
}