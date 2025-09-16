// Nickname: 3-16 chars, alphanumeric only
export function validateNickname(nick: string): boolean {
  return /^[a-zA-Z0-9]{3,16}$/.test(nick);
}

// Room code: 6 chars, uppercase alphanumeric
export function validateRoomCode(code: string): boolean {
  return /^[A-Z0-9]{6}$/.test(code.toUpperCase());
}

// WordChain: 2-16 letters, no spaces
export function validateWord(word: string): boolean {
  return /^[a-zA-Z]{2,16}$/.test(word);
}
