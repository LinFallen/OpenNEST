import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  showGrid: boolean;
  gridSize: number;
  unit: 'mm' | 'inch';
  cursorPosition: { x: number; y: number };
  applicationStatus: string;
}

const initialState: SettingsState = {
  showGrid: true,
  gridSize: 20,
  unit: 'mm',
  cursorPosition: { x: 0, y: 0 },
  applicationStatus: 'Ready'
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
    },
    setUnit: (state, action: PayloadAction<'mm' | 'inch'>) => {
      state.unit = action.payload;
    },
    toggleUnit: (state) => {
      state.unit = state.unit === 'mm' ? 'inch' : 'mm';
    },
    setCursorPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.cursorPosition = action.payload;
    },
    setApplicationStatus: (state, action: PayloadAction<string>) => {
      state.applicationStatus = action.payload;
    }
  }
});

export const { 
  toggleGrid, 
  setShowGrid, 
  setGridSize, 
  setUnit, 
  toggleUnit,
  setCursorPosition,
  setApplicationStatus
} = settingsSlice.actions;
export default settingsSlice.reducer;
