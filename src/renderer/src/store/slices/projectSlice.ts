import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as THREE from 'three';

export interface Part {
  id: string;
  name: string;
  entities: any[]; // DXF entities
  objects: THREE.Object3D[]; // Three.js objects
  bounds: {
    min: THREE.Vector3;
    max: THREE.Vector3;
  };
  position: { x: number; y: number };
  rotation: number;
  layer: string;
  material: string;
  quantity: number;
  selected: boolean;
}

export interface ProjectState {
  parts: Part[];
  selectedPartId: string | null;
  sheetSize: { width: number; height: number };
}

const initialState: ProjectState = {
  parts: [],
  selectedPartId: null,
  sheetSize: { width: 24, height: 12 } // 2400mm x 1200mm in decimeters
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addPart: (state, action: PayloadAction<Part>) => {
      state.parts.push(action.payload);
    },
    removePart: (state, action: PayloadAction<string>) => {
      state.parts = state.parts.filter((p) => p.id !== action.payload);
      if (state.selectedPartId === action.payload) {
        state.selectedPartId = null;
      }
    },
    selectPart: (state, action: PayloadAction<string | null>) => {
      state.parts.forEach((p) => {
        p.selected = p.id === action.payload;
      });
      state.selectedPartId = action.payload;
    },
    updatePartPosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const part = state.parts.find((p) => p.id === action.payload.id);
      if (part) {
        part.position = { x: action.payload.x, y: action.payload.y };
      }
    },
    updatePartRotation: (
      state,
      action: PayloadAction<{ id: string; rotation: number }>
    ) => {
      const part = state.parts.find((p) => p.id === action.payload.id);
      if (part) {
        part.rotation = action.payload.rotation;
      }
    },
    setSheetSize: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.sheetSize = action.payload;
    }
  }
});

export const {
  addPart,
  removePart,
  selectPart,
  updatePartPosition,
  updatePartRotation,
  setSheetSize
} = projectSlice.actions;

export default projectSlice.reducer;
