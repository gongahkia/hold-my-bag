// Mock data for HoldMyBag demo
export const mockUsers = [
  { id: '1', nickname: 'Alice' },
  { id: '2', nickname: 'Bob' },
  { id: '3', nickname: 'Charlie' },
  { id: '4', nickname: 'Diana' },
  { id: '5', nickname: 'Eve' },
  { id: '6', nickname: 'Frank' }
]

export const mockRooms = [
  {
    id: 'room1',
    code: 'ABC123',
    gameType: 'colorMatch',
    host: mockUsers[0],
    players: [mockUsers[0], mockUsers[1], mockUsers[2]],
    maxPlayers: 6,
    status: 'waiting',
    createdAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'room2',
    code: 'XYZ789',
    gameType: 'quickDraw',
    host: mockUsers[3],
    players: [mockUsers[3], mockUsers[4]],
    maxPlayers: 4,
    status: 'playing',
    createdAt: new Date('2024-01-15T11:00:00')
  }
]

export const mockGameTypes = [
  {
    id: 'colorMatch',
    name: 'Color Match',
    icon: '🎨',
    description: 'Match colors as fast as you can!',
    minPlayers: 2,
    maxPlayers: 6,
    duration: '2-3 minutes'
  },
  {
    id: 'quickDraw',
    name: 'Quick Draw',
    icon: '✏️',
    description: 'Draw and guess in real-time',
    minPlayers: 3,
    maxPlayers: 8,
    duration: '5-7 minutes'
  },
  {
    id: 'snakeRoyale',
    name: 'Snake Royale',
    icon: '🐍',
    description: 'Battle royale with snakes',
    minPlayers: 4,
    maxPlayers: 10,
    duration: '3-5 minutes'
  },
  {
    id: 'tapBattle',
    name: 'Tap Battle',
    icon: '👆',
    description: 'Tap faster than your friends',
    minPlayers: 2,
    maxPlayers: 6,
    duration: '1-2 minutes'
  },
  {
    id: 'triviaBlitz',
    name: 'Trivia Blitz',
    icon: '🧠',
    description: 'Quick trivia questions',
    minPlayers: 2,
    maxPlayers: 12,
    duration: '4-6 minutes'
  },
  {
    id: 'wordChain',
    name: 'Word Chain',
    icon: '🔗',
    description: 'Build word chains together',
    minPlayers: 3,
    maxPlayers: 8,
    duration: '3-4 minutes'
  }
]

export const mockGameHistory = [
  {
    id: 'game1',
    gameType: 'colorMatch',
    roomCode: 'ABC123',
    players: [mockUsers[0], mockUsers[1], mockUsers[2]],
    winner: mockUsers[1],
    score: { [mockUsers[0].id]: 85, [mockUsers[1].id]: 120, [mockUsers[2].id]: 95 },
    duration: 143000, // 2 minutes 23 seconds
    playedAt: new Date('2024-01-15T09:45:00')
  },
  {
    id: 'game2',
    gameType: 'tapBattle',
    roomCode: 'DEF456',
    players: [mockUsers[0], mockUsers[3]],
    winner: mockUsers[0],
    score: { [mockUsers[0].id]: 89, [mockUsers[3].id]: 76 },
    duration: 87000, // 1 minute 27 seconds
    playedAt: new Date('2024-01-15T09:15:00')
  },
  {
    id: 'game3',
    gameType: 'triviaBlitz',
    roomCode: 'GHI789',
    players: [mockUsers[0], mockUsers[1], mockUsers[4], mockUsers[5]],
    winner: mockUsers[4],
    score: {
      [mockUsers[0].id]: 7,
      [mockUsers[1].id]: 5,
      [mockUsers[4].id]: 9,
      [mockUsers[5].id]: 6
    },
    duration: 267000, // 4 minutes 27 seconds
    playedAt: new Date('2024-01-14T16:30:00')
  }
]

export const mockColorMatchGame = {
  currentRound: 3,
  totalRounds: 10,
  timeLeft: 15,
  targetColor: '#FF6B6B',
  colorOptions: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
  scores: {
    [mockUsers[0].id]: { correct: 2, total: 3, streak: 2 },
    [mockUsers[1].id]: { correct: 3, total: 3, streak: 3 },
    [mockUsers[2].id]: { correct: 1, total: 3, streak: 0 }
  },
  leaderboard: [
    { user: mockUsers[1], score: 95, rank: 1 },
    { user: mockUsers[0], score: 78, rank: 2 },
    { user: mockUsers[2], score: 34, rank: 3 }
  ]
}

export const mockTriviaQuestion = {
  id: 'q1',
  question: 'What is the capital of Japan?',
  options: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'],
  correctAnswer: 0,
  timeLeft: 12,
  totalTime: 15,
  category: 'Geography',
  difficulty: 'Easy'
}

export const mockDrawingPrompts = [
  'Draw a cat wearing sunglasses',
  'Draw a house on a hill',
  'Draw a robot dancing',
  'Draw a pizza with unusual toppings',
  'Draw a superhero flying',
  'Draw a tree with magical fruits'
]

export const mockPlayerStats = {
  [mockUsers[0].id]: {
    gamesPlayed: 15,
    gamesWon: 7,
    favoriteGame: 'colorMatch',
    totalPoints: 1247,
    winRate: 0.47,
    averageScore: 83,
    achievements: ['First Win', 'Speed Demon', 'Social Butterfly'],
    rank: 'Bronze'
  }
}

export const mockAchievements = [
  { id: 'first_win', name: 'First Win', description: 'Win your first game', icon: '🏆', earned: true },
  { id: 'speed_demon', name: 'Speed Demon', description: 'Win a game in under 60 seconds', icon: '⚡', earned: true },
  { id: 'social_butterfly', name: 'Social Butterfly', description: 'Play with 10 different people', icon: '🦋', earned: true },
  { id: 'perfectionist', name: 'Perfectionist', description: 'Get 100% accuracy in a trivia game', icon: '💯', earned: false },
  { id: 'artist', name: 'Artist', description: 'Win 5 drawing games', icon: '🎨', earned: false },
  { id: 'champion', name: 'Champion', description: 'Win 50 games', icon: '👑', earned: false }
]

// Simulate API delays for realistic feel
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API functions
export const mockAPI = {
  async login(nickname: string) {
    await delay(800)
    const user = { id: Date.now().toString(), nickname }
    const token = `mock-token-${user.id}`
    return { user, token }
  },

  async createRoom(gameType: string, maxPlayers: number) {
    await delay(1200)
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    const room = {
      id: Date.now().toString(),
      code,
      gameType,
      host: mockUsers[0], // Current user
      players: [mockUsers[0]],
      maxPlayers,
      status: 'waiting',
      createdAt: new Date()
    }
    return { room }
  },

  async joinRoom(code: string) {
    await delay(900)
    const room = mockRooms.find(r => r.code === code) || mockRooms[0]
    return { room: { ...room, players: [...room.players, mockUsers[0]] } }
  },

  async getGameHistory() {
    await delay(600)
    return mockGameHistory
  },

  async getPlayerStats(userId: string) {
    await delay(400)
    return mockPlayerStats[userId] || mockPlayerStats[mockUsers[0].id]
  }
}