# OpenNEST Implementation Plan

## Goal Description
Build a desktop-based CAD/CAM software (OpenNEST) using Electron, React, and Three.js. The goal is to create a "Precision Instrument" quality application for importing DXF files, nesting them on a material sheet, and generating G-Code for CNC machines.
**Focus**: MVP with High-Fidelity UI ("Dark Engineering" Style).

## User Review Required
> [!IMPORTANT]
> **Tech Stack Selection**: We will use `electron-vite` with React and TypeScript. This provides a modern, fast development experience unlike the traditional CRA-based electron setups.
>
> **UI Library**: We will use `@fluentui/react-components` (v9) as requested in the specs. We will need to heavily customize the tokens to match the `#1E1E1E` dark theme.

## Proposed Changes

### Phase 1: Project Skeleton
#### [NEW] [package.json](file:///Users/seaforest/Projects/JS-FullStack/OpenNEST/package.json)
- Initialize using `npm create electron-vite`.
- Dependencies: `react`, `react-dom`, `@fluentui/react-components`, `three`, `@react-three/fiber` (for easier React integration), `@react-three/drei`, `@reduxjs/toolkit`, `react-redux`, `dxf-parser`.
- DevDependencies: `typescript`, `electron`, `vite`, `eslint`, `prettier`.

### Phase 2: UI Architecture
#### [NEW] [src/renderer/App.tsx](file:///Users/seaforest/Projects/JS-FullStack/OpenNEST/src/renderer/src/App.tsx)
- Main layout composition (Sidebar, Toolbar, Canvas, Properties).
- Fluent UI `FluentProvider` with a custom `BrandVariants` theme.

#### [NEW] [src/renderer/components/Canvas/InfiniteGrid.tsx](file:///Users/seaforest/Projects/JS-FullStack/OpenNEST/src/renderer/src/components/Canvas/InfiniteGrid.tsx)
- A Three.js component wrapper for the infinite grid shader or helper.

#### [NEW] [src/renderer/store/store.ts](file:///Users/seaforest/Projects/JS-FullStack/OpenNEST/src/renderer/src/store/store.ts)
- Redux store configuration.
- Slices: `canvasSlice` (zoom, pan), `projectSlice` (loaded files), `selectionSlice`.

### Phase 3: Core Features (MVP)
1.  **DXF Loader**: Use `dxf-parser` to read file content in main process or renderer, convert entities to Three.js BufferGeometries.
2.  **Part Management**: Store parts in Redux. Calculate bounding boxes.
3.  **Nesting**: Implement a greedy rectangular placement algorithm for the MVP.
4.  **G-Code**: Iterate over the placed parts paths and generate string output.

## Verification Plan

### Automated Tests
- `npm run typecheck` for TypeScript validation.
- `npm run lint` for code style.
- Unit tests for the Nesting Algorithm (pure JS/TS logic).

### Manual Verification
- **Launch**: App starts without errors in Electron window.
- **UI**: Check "Dark Engineering" theme consistency against `prototype.html`.
- **Canvas**: Verify 3D/2D grid rendering, panning, and zooming.
- **Workflow**: Import a sample DXF -> See it on screen -> Simulate Nesting -> Check G-Code text output.
