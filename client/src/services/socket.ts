import { io, Socket } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'ws://localhost:4000'

class SocketService {
  private socket: Socket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  connect(): Socket {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
        autoConnect: true,
      })

      this.socket.on('connect', () => {
        console.log('Connected to server')
        this.reconnectAttempts = 0
      })

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server')
      })

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error)
        this.handleReconnect()
      })
    }

    return this.socket
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Reconnection attempt ${this.reconnectAttempts}`)
        this.socket?.connect()
      }, 1000 * this.reconnectAttempts)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // Room events
  joinRoom(roomCode: string, userId: string, nickname: string) {
    this.socket?.emit('join-room', { roomCode, userId, nickname })
  }

  leaveRoom(roomCode: string) {
    this.socket?.emit('leave-room', { roomCode })
  }

  startGame(roomCode: string) {
    this.socket?.emit('start-game', { roomCode })
  }

  // Game events
  sendGameAction(roomCode: string, action: string, payload: any) {
    this.socket?.emit('game-action', { roomCode, action, payload })
  }

  // Event listeners
  onRoomJoined(callback: (data: any) => void) {
    this.socket?.on('room-joined', callback)
  }

  onPlayersUpdated(callback: (data: { players: any[] }) => void) {
    this.socket?.on('players-updated', callback)
  }

  onPlayerJoined(callback: (data: { player: any }) => void) {
    this.socket?.on('player-joined', callback)
  }

  onPlayerLeft(callback: (data: { player: any }) => void) {
    this.socket?.on('player-left', callback)
  }

  onGameStarted(callback: (data: any) => void) {
    this.socket?.on('game-started', callback)
  }

  onGameAction(callback: (data: { action: string; payload: any; playerId: string }) => void) {
    this.socket?.on('game-action', callback)
  }

  onError(callback: (data: { message: string }) => void) {
    this.socket?.on('error', callback)
  }

  // Clean up listeners
  removeAllListeners() {
    this.socket?.removeAllListeners()
  }

  removeListener(event: string) {
    this.socket?.off(event)
  }

  getSocket(): Socket | null {
    return this.socket
  }
}

export const socketService = new SocketService()
export default socketService
