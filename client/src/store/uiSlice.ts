import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
}

const initialState: UIState = {
  loading: false,
  error: null,
  modalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    },
    resetUI(state) {
      state.loading = false;
      state.error = null;
      state.modalOpen = false;
    },
  },
});

export const { setLoading, setError, setModalOpen, resetUI } = uiSlice.actions;
export default uiSlice.reducer;
