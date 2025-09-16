export interface TapBattleState {
  score: number;
  timeLeft: number;
  running: boolean;
}

export interface TapBattleAction {
  type: "start" | "tap" | "end" | "reset";
  payload?: any;
}
