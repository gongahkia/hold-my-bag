export interface QuickDrawState {
  drawing: string; // base64 or canvas data url
  isDrawing: boolean;
  round: number;
  players: { id: string, name: string }[];
  canvasData?: string;
}

export interface QuickDrawAction {
  type: "start" | "draw" | "submit" | "reset";
  payload?: any;
}
