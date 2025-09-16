export function isValidNickname(nick: string): boolean {
  return /^[a-zA-Z0-9]{3,16}$/.test(nick);
}

export function isValidRoomCode(code: string): boolean {
  return /^[A-Z0-9]{6}$/.test(code);
}
