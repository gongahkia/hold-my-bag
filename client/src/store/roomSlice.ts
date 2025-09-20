import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './authSlice'

export interface Room {
  id: string
  code: string
  gameType: string
  status: 'waiting' | 'playing' | 'finished'
  maxPlayers: number
  hostId: string
}

export interface Player {
  id: string
  nickname: string
}

interface RoomState {
  currentRoom: Room | null
  players: Player[]
  isHost: boolean
  isConnected: boolean
  error: string | null
}

const initialState: RoomState = {
  currentRoom: null,
  players: [],
  isHost: false,
  isConnected: false,
  error: null,
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom(state, action: PayloadAction<{ room: Room; players: Player[]; isHost: boolean }>) {
      state.currentRoom = action.payload.room
      state.players = action.payload.players
      state.isHost = action.payload.isHost
      state.isConnected = true
      state.error = null
    },
    updatePlayers(state, action: PayloadAction<Player[]>) {
      state.players = action.payload
    },
    addPlayer(state, action: PayloadAction<Player>) {
      const exists = state.players.find(p => p.id === action.payload.id)
      if (!exists) {
        state.players.push(action.payload)
      }
    },
    removePlayer(state, action: PayloadAction<string>) {
      state.players = state.players.filter(p => p.id !== action.payload)
    },
    updateRoomStatus(state, action: PayloadAction<Room['status']>) {
      if (state.currentRoom) {
        state.currentRoom.status = action.payload
      }
    },
    setConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    leaveRoom(state) {
      state.currentRoom = null
      state.players = []
      state.isHost = false
      state.isConnected = false
      state.error = null
    },
  },
})

export const {
  setRoom,
  updatePlayers,
  addPlayer,
  removePlayer,
  updateRoomStatus,
  setConnected,
  setError,
  leaveRoom,
} = roomSlice.actions

export default roomSlice.reducer