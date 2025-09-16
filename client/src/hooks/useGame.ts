import { useState } from "react";

export function useGame<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  return [state, setState] as const;
}
