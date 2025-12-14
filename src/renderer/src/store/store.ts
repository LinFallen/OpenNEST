import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    settings: settingsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
