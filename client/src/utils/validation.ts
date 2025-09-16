// Validate nickname (alphanumeric, 3-16 chars)
export function validateNickname(nick: string): boolean {
  return /^[a-zA-Z0-9]{3,16}$/.test(nick);
}

// Validate room code
export function validateRoomCode(code: string): boolean {
  return /^[A-Z0-9]{6}$/.test(code.toUpperCase());
}

// Validate word for WordChain (letters only, 2-16 chars)
export function validateWord(word: string): boolean {
  return /^[a-zA-Z]{2,16}$/.test(word);
}
