import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import QRCode from 'qrcode'
import prisma from '../config/database'
import { createError } from '../middleware/errorHandler'
import { AuthRequest } from '../middleware/auth'

const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { gameType, maxPlayers = 6 } = req.body
    const hostId = req.user!.id

    if (!gameType) {
      throw createError('Game type is required', 400)
    }

    const validGameTypes = ['colorMatch', 'quickDraw', 'snakeRoyale', 'tapBattle', 'triviaBlitz', 'wordChain']
    if (!validGameTypes.includes(gameType)) {
      throw createError('Invalid game type', 400)
    }

    let roomCode: string
    let existingRoom

    do {
      roomCode = generateRoomCode()
      existingRoom = await prisma.room.findUnique({ where: { code: roomCode } })
    } while (existingRoom)

    const room = await prisma.room.create({
      data: {
        id: uuidv4(),
        code: roomCode,
        hostId,
        gameType,
        status: 'waiting',
        maxPlayers: Math.min(Math.max(maxPlayers, 2), 8)
      }
    })

    const roomUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/room/${roomCode}`
    const qrCode = await QRCode.toDataURL(roomUrl)

    res.status(201).json({
      room: {
        id: room.id,
        code: room.code,
        gameType: room.gameType,
        status: room.status,
        maxPlayers: room.maxPlayers,
        hostId: room.hostId
      },
      qrCode,
      roomUrl
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

export const joinRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { code } = req.params
    const userId = req.user!.id

    const room = await prisma.room.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        games: {
          include: {
            scores: true
          }
        }
      }
    })

    if (!room) {
      throw createError('Room not found', 404)
    }

    if (room.status === 'finished') {
      throw createError('Room has finished', 400)
    }

    res.json({
      room: {
        id: room.id,
        code: room.code,
        gameType: room.gameType,
        status: room.status,
        maxPlayers: room.maxPlayers,
        hostId: room.hostId
      }
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

export const getRoomStatus = async (req: Request, res: Response) => {
  try {
    const { code } = req.params

    const room = await prisma.room.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        games: {
          include: {
            scores: {
              include: {
                user: {
                  select: { id: true, nickname: true }
                }
              }
            }
          }
        }
      }
    })

    if (!room) {
      throw createError('Room not found', 404)
    }

    res.json({ room })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}