import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  showGrid: boolean;
  gridSize: number;
}

const initialState: SettingsState = {
  showGrid: true,
  gridSize: 20 // pixels
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleGrid: (state) => {
      state.showGrid = !state.showGrid;
    },
    setShowGrid: (state, action: PayloadAction<boolean>) => {
      state.showGrid = action.payload;
    },
    setGridSize: (state, action: PayloadAction<number>) => {
      state.gridSize = action.payload;
    }
  }
});

export const { toggleGrid, setShowGrid, setGridSize } = settingsSlice.actions;
export default settingsSlice.reducer;
