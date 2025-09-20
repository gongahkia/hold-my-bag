const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

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
  register: (nickname: string) =>
    apiRequest<{ user: { id: string; nickname: string }; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nickname }),
    }),

  validateToken: (token: string) =>
    apiRequest<{ user: { id: string; nickname: string }; valid: boolean }>('/auth/validate', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
}

// Room API
export const roomAPI = {
  create: (gameType: string, maxPlayers?: number) =>
    apiRequest<{
      room: { id: string; code: string; gameType: string; status: string; maxPlayers: number; hostId: string }
      qrCode: string
      roomUrl: string
    }>('/rooms/create', {
      method: 'POST',
      body: JSON.stringify({ gameType, maxPlayers }),
    }),

  join: (code: string) =>
    apiRequest<{ room: { id: string; code: string; gameType: string; status: string; maxPlayers: number; hostId: string } }>(`/rooms/join/${code}`),

  getStatus: (code: string) =>
    apiRequest<{ room: any }>(`/rooms/status/${code}`),
}

// Game API
export const gameAPI = {
  start: (roomId: string) =>
    apiRequest<{ game: any }>('/games/start', {
      method: 'POST',
      body: JSON.stringify({ roomId }),
    }),

  submitScore: (gameId: string, score: number) =>
    apiRequest<{ score: any }>('/games/score', {
      method: 'POST',
      body: JSON.stringify({ gameId, score }),
    }),

  getLeaderboard: (gameId: string) =>
    apiRequest<{ leaderboard: any[] }>(`/games/leaderboard/${gameId}`),
}

// User API
export const userAPI = {
  getProfile: () => apiRequest<{ user: any; recentScores: any[]; stats: any }>('/users/profile'),

  updateProfile: (nickname: string) =>
    apiRequest<{ user: any }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify({ nickname }),
    }),
}
