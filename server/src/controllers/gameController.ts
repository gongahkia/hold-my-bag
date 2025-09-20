import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import prisma from '../config/database'
import { createError } from '../middleware/errorHandler'
import { AuthRequest } from '../middleware/auth'

export const startGame = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.body
    const userId = req.user!.id

    const room = await prisma.room.findUnique({
      where: { id: roomId }
    })

    if (!room) {
      throw createError('Room not found', 404)
    }

    if (room.hostId !== userId) {
      throw createError('Only the host can start the game', 403)
    }

    if (room.status !== 'waiting') {
      throw createError('Game cannot be started in current room status', 400)
    }

    const game = await prisma.game.create({
      data: {
        id: uuidv4(),
        roomId,
        status: 'active',
        startTime: new Date(),
        gameData: {}
      }
    })

    await prisma.room.update({
      where: { id: roomId },
      data: { status: 'playing' }
    })

    res.json({ game })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

export const endGame = async (req: AuthRequest, res: Response) => {
  try {
    const { gameId } = req.params
    const userId = req.user!.id

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { room: true }
    })

    if (!game) {
      throw createError('Game not found', 404)
    }

    if (game.room.hostId !== userId) {
      throw createError('Only the host can end the game', 403)
    }

    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: {
        status: 'finished',
        endTime: new Date()
      }
    })

    await prisma.room.update({
      where: { id: game.roomId },
      data: { status: 'finished' }
    })

    res.json({ game: updatedGame })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

export const submitScore = async (req: AuthRequest, res: Response) => {
  try {
    const { gameId, score } = req.body
    const userId = req.user!.id

    if (typeof score !== 'number' || score < 0) {
      throw createError('Invalid score', 400)
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId }
    })

    if (!game) {
      throw createError('Game not found', 404)
    }

    if (game.status !== 'active') {
      throw createError('Cannot submit score for inactive game', 400)
    }

    const existingScore = await prisma.score.findFirst({
      where: {
        userId,
        gameId
      }
    })

    let scoreRecord
    if (existingScore) {
      scoreRecord = await prisma.score.update({
        where: { id: existingScore.id },
        data: { score: Math.max(existingScore.score, score) }
      })
    } else {
      scoreRecord = await prisma.score.create({
        data: {
          id: uuidv4(),
          userId,
          gameId,
          score
        }
      })
    }

    res.json({ score: scoreRecord })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params

    const scores = await prisma.score.findMany({
      where: { gameId },
      include: {
        user: {
          select: { id: true, nickname: true }
        }
      },
      orderBy: { score: 'desc' }
    })

    res.json({ leaderboard: scores })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}