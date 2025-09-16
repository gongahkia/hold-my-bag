import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  nickname: string | null;
  token: string | null;
}

const initialState: AuthState = {
  userId: null,
  nickname: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ userId: string; nickname: string; token: string }>) {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.token = action.payload.token;
    },
    logout(state) {
      state.userId = null;
      state.nickname = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
