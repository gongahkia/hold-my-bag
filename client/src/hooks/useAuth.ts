import { useState } from "react";

export function useAuth() {
  const [authed, setAuthed] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const login = (token: string) => {
    setToken(token);
    setAuthed(true);
  };
  const logout = () => {
    setToken(null);
    setAuthed(false);
  };
  return { authed, token, login, logout };
}
