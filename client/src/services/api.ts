import { mockAPI } from '../data/mockData'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// Demo mode - using hardcoded data instead of real API
const USE_MOCK_API = true // Set to false to use real backend

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const token = localStorage.getItem('token')
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config: RequestInit = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Request failed:', error)
    throw error
  }
}

// Auth API
export const authAPI = {
  register: async (nickname: string) => {
    if (USE_MOCK_API) {
      return await mockAPI.login(nickname)
    }
    return apiRequest<{ user: { id: string; nickname: string }; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nickname }),
    })
  },

  validateToken: async (token: string) => {
    if (USE_MOCK_API) {
      // Mock validation - always return valid for demo
      return {
        valid: true,
        user: { id: '1', nickname: 'Demo User' }
      }
    }
    return apiRequest<{ user: { id: string; nickname: string }; valid: boolean }>('/auth/validate', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
  },
}

// Room API
export const roomAPI = {
  create: async (gameType: string, maxPlayers?: number) => {
    if (USE_MOCK_API) {
      return await mockAPI.createRoom(gameType, maxPlayers || 6)
    }
    return apiRequest<{
      room: { id: string; code: string; gameType: string; status: string; maxPlayers: number; hostId: string }
      qrCode: string
      roomUrl: string
    }>('/rooms/create', {
      method: 'POST',
      body: JSON.stringify({ gameType, maxPlayers }),
    })
  },

  join: async (code: string) => {
    if (USE_MOCK_API) {
      return await mockAPI.joinRoom(code)
    }
    return apiRequest<{ room: { id: string; code: string; gameType: string; status: string; maxPlayers: number; hostId: string } }>(`/rooms/join/${code}`)
  },

  getStatus: async (code: string) => {
    if (USE_MOCK_API) {
      const { mockRooms } = await import('../data/mockData')
      return { room: mockRooms.find(r => r.code === code) || mockRooms[0] }
    }
    return apiRequest<{ room: any }>(`/rooms/status/${code}`)
  },
}

// Game API
export const gameAPI = {
  start: async (roomId: string) => {
    if (USE_MOCK_API) {
      const { mockColorMatchGame } = await import('../data/mockData')
      return { game: mockColorMatchGame }
    }
    return apiRequest<{ game: any }>('/games/start', {
      method: 'POST',
      body: JSON.stringify({ roomId }),
    })
  },

  submitScore: async (gameId: string, score: number) => {
    if (USE_MOCK_API) {
      return { score: { gameId, score, submitted: true } }
    }
    return apiRequest<{ score: any }>('/games/score', {
      method: 'POST',
      body: JSON.stringify({ gameId, score }),
    })
  },

  getLeaderboard: async (gameId: string) => {
    if (USE_MOCK_API) {
      const { mockColorMatchGame } = await import('../data/mockData')
      return { leaderboard: mockColorMatchGame.leaderboard }
    }
    return apiRequest<{ leaderboard: any[] }>(`/games/leaderboard/${gameId}`)
  },

  getHistory: async () => {
    if (USE_MOCK_API) {
      return await mockAPI.getGameHistory()
    }
    return apiRequest<any[]>('/games/history')
  },

  getStats: async (userId: string) => {
    if (USE_MOCK_API) {
      return await mockAPI.getPlayerStats(userId)
    }
    return apiRequest<any>(`/games/stats/${userId}`)
  },
}

// User API
export const userAPI = {
  getProfile: async () => {
    if (USE_MOCK_API) {
      const { mockUsers, mockPlayerStats, mockGameHistory } = await import('../data/mockData')
      return {
        user: mockUsers[0],
        recentScores: mockGameHistory.slice(0, 5),
        stats: mockPlayerStats[mockUsers[0].id]
      }
    }
    return apiRequest<{ user: any; recentScores: any[]; stats: any }>('/users/profile')
  },

  updateProfile: async (nickname: string) => {
    if (USE_MOCK_API) {
      return { user: { id: '1', nickname } }
    }
    return apiRequest<{ user: any }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify({ nickname }),
    })
  },
}
