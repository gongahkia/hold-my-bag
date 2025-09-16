export async function getLeaderboard(): Promise<any> {
  return fetch('/api/leaderboard').then(r => r.json());
}

export async function joinRoom(roomCode: string): Promise<any> {
  return fetch(`/api/rooms/join/${roomCode}`, { method: "POST" }).then(r => r.json());
}
