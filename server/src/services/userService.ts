export async function getUserProfile(userId: string) {
  // TODO: Fetch user profile from DB
  return { userId, nickname: "User", gamesPlayed: 0, bestScore: 0 };
}

export async function updateUserProfile(userId: string, updates: any) {
  // TODO: Update user profile in DB
  return { success: true };
}
