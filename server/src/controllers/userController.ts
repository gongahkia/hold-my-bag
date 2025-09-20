import { Request, Response } from 'express'
import prisma from '../config/database'
import { createError } from '../middleware/errorHandler'
import { AuthRequest } from '../middleware/auth'

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        gameScores: {
          include: {
            game: {
              include: {
                room: {
                  select: { gameType: true }
                }
              }
            }
          },
          orderBy: { achievedAt: 'desc' },
          take: 20
        }
      }
    })

    if (!user) {
      throw createError('User not found', 404)
    }

    await prisma.user.update({
      where: { id: userId },
      data: { lastActive: new Date() }
    })

    const stats = {
      totalGames: user.gameScores.length,
      averageScore: user.gameScores.length > 0
        ? user.gameScores.reduce((sum, score) => sum + score.score, 0) / user.gameScores.length
        : 0,
      bestScore: user.gameScores.length > 0
        ? Math.max(...user.gameScores.map(score => score.score))
        : 0,
      gamesByType: user.gameScores.reduce((acc, score) => {
        const gameType = score.game.room.gameType
        acc[gameType] = (acc[gameType] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }

    res.json({
      user: {
        id: user.id,
        nickname: user.nickname,
        createdAt: user.createdAt,
        lastActive: user.lastActive
      },
      recentScores: user.gameScores,
      stats
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const { nickname } = req.body

    if (!nickname || nickname.trim().length === 0) {
      throw createError('Nickname is required', 400)
    }

    if (nickname.length > 20) {
      throw createError('Nickname must be 20 characters or less', 400)
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        nickname: nickname.trim(),
        lastActive: new Date()
      }
    })

    res.json({
      user: {
        id: updatedUser.id,
        nickname: updatedUser.nickname,
        lastActive: updatedUser.lastActive
      }
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}