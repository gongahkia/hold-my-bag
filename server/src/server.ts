import { Server } from 'socket.io'
import { createServer } from 'http'
import app from './app'
import { config } from './config/environment'
import redis from './config/redis'
import prisma from './config/database'

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

interface RoomData {
  players: Map<string, { id: string; nickname: string }>
  gameState: any
  host: string
}

const rooms: Map<string, RoomData> = new Map()

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join-room', async (data: { roomCode: string; userId: string; nickname: string }) => {
    const { roomCode, userId, nickname } = data

    try {
      const room = await prisma.room.findUnique({
        where: { code: roomCode.toUpperCase() }
      })

      if (!room) {
        socket.emit('error', { message: 'Room not found' })
        return
      }

      if (!rooms.has(roomCode)) {
        rooms.set(roomCode, {
          players: new Map(),
          gameState: {},
          host: room.hostId
        })
      }

      const roomData = rooms.get(roomCode)!
      roomData.players.set(socket.id, { id: userId, nickname })

      socket.join(roomCode)

      const playerList = Array.from(roomData.players.values())
      io.to(roomCode).emit('players-updated', { players: playerList })
      io.to(roomCode).emit('player-joined', { player: { id: userId, nickname } })

      socket.emit('room-joined', {
        room: {
          code: roomCode,
          gameType: room.gameType,
          status: room.status,
          hostId: room.hostId
        },
        players: playerList
      })
    } catch (error) {
      socket.emit('error', { message: 'Failed to join room' })
    }
  })

  socket.on('leave-room', (data: { roomCode: string }) => {
    const { roomCode } = data
    handlePlayerLeaving(socket, roomCode)
  })

  socket.on('start-game', async (data: { roomCode: string }) => {
    const { roomCode } = data
    const roomData = rooms.get(roomCode)

    if (!roomData) {
      socket.emit('error', { message: 'Room not found' })
      return
    }

    const player = roomData.players.get(socket.id)
    if (!player || player.id !== roomData.host) {
      socket.emit('error', { message: 'Only host can start the game' })
      return
    }

    try {
      await prisma.room.update({
        where: { code: roomCode },
        data: { status: 'playing' }
      })

      io.to(roomCode).emit('game-started', {
        players: Array.from(roomData.players.values())
      })
    } catch (error) {
      socket.emit('error', { message: 'Failed to start game' })
    }
  })

  socket.on('game-action', (data: { roomCode: string; action: string; payload: any }) => {
    const { roomCode, action, payload } = data
    socket.to(roomCode).emit('game-action', { action, payload, playerId: socket.id })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)

    for (const [roomCode, roomData] of rooms.entries()) {
      if (roomData.players.has(socket.id)) {
        handlePlayerLeaving(socket, roomCode)
        break
      }
    }
  })

  function handlePlayerLeaving(socket: any, roomCode: string) {
    const roomData = rooms.get(roomCode)
    if (!roomData) return

    const player = roomData.players.get(socket.id)
    if (player) {
      roomData.players.delete(socket.id)
      socket.leave(roomCode)

      const playerList = Array.from(roomData.players.values())
      io.to(roomCode).emit('players-updated', { players: playerList })
      io.to(roomCode).emit('player-left', { player })

      if (roomData.players.size === 0) {
        rooms.delete(roomCode)
      }
    }
  }
})

async function startServer() {
  try {
    await redis.connect()
    console.log('Connected to Redis')

    await prisma.$connect()
    console.log('Connected to Database')

    server.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  await redis.disconnect()
  process.exit(0)
})

if (require.main === module) {
  startServer()
}

export { server, io }
