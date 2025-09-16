export async function createRoom(gameType: string, hostId: string) {
  // TODO: Create and persist a new room in DB/Redis
  return { roomCode: "ABC123" };
}

export async function joinRoom(roomCode: string, userId: string) {
  // TODO: Validate and join room in DB/Redis
  return { success: true };
}
