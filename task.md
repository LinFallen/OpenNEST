# OpenNEST Implementation Tasks - MVP Priority

## ✅ Completed Phases

- [x] **Phase 1: Project Initialization**
    - [x] Initialize project with Electron + React + TypeScript (Vite based)
    - [x] Configure ESLint, Prettier, and project structure
    - [x] Install core dependencies (Three.js, Fluent UI, Redux Toolkit)
- [x] **Phase 2: UI Foundation**
    - [x] Implement Global Theme (Dark Engineering) & Layout Shell
    - [x] Create core UI components (Sidebar, TopBar, StatusBar, PropertiesPanel)
- [x] **Phase 3: Graphics Core (Three.js)**
    - [x] Initialize Infinite Canvas (Grid, Axes, Camera Controls)
    - [x] Implement DXF Import & Rendering
    - [x] Implement Selection & Transform controls (Drag, Rotate)
    - [x] Add Rulers with world coordinates (Top and Left)
    - [x] Add Scale Indicator (Bottom-Left corner)
    - [x] Implement Grid Toggle functionality

---

## 🎯 MVP Core Features (High Priority)

- [ ] **Phase 4: StatusBar - Core UX** ⭐ **← START HERE**
    - [ ] Display real-time cursor position (X, Y in mm)
    - [ ] Show current application status (Ready, Nesting, Busy)
    - [ ] Add Unit switcher (mm/inch)
    - [ ] Apply blue accent background (#007ACC)
    
- [ ] **Phase 5: PropertiesPanel - Bidirectional Binding**
    - [ ] Bind Position X/Y inputs to Redux state
    - [ ] Bind Rotation input to Redux state
    - [ ] Add Machining Parameters section
        - [ ] Tool Diameter input
        - [ ] Lead In distance input
        - [ ] Kerf compensation input

- [ ] **Phase 6: Sheet Management Basics**
    - [ ] Sheet dimension display ("2400 x 1200 mm")
    - [ ] Constraint: Parts stay within sheet boundaries
    - [ ] Support adding/removing sheets
    
- [ ] **Phase 7: Logic Core - Nesting & G-Code**
    - [x] Define Redux State Slice for Parts and Sheets
    - [ ] Implement Basic Nesting Algorithm (Rectangular packer MVP)
    - [ ] Implement G-Code Generator Logic
    - [ ] Add "Generate G-Code" button functionality

---

## 💎 Essential UX Enhancements (Medium Priority)

- [ ] **Phase 8: Project Explorer - Essential Info**
    - [ ] Display part quantity (QTY) in file list
    - [ ] Show material type (e.g., "Steel 2mm")
    - [ ] Basic Layers panel with color indicators

- [ ] **Phase 9: Notifications System**
    - [ ] Implement Toast notification component
    - [ ] Show nesting completion with utilization %
    - [ ] Success/error badges
    - [ ] Slide-up animation

- [ ] **Phase 10: Context Menu & Basic Operations**
    - [ ] Add context menu for right-click
    - [ ] Implement copy/paste/duplicate
    - [ ] Add delete part functionality
    - [ ] Basic keyboard shortcuts (Delete, Ctrl+C/V)

---

## 🎨 Advanced Features (Lower Priority)

- [ ] **Phase 11: Drawing Tools**
    - [ ] Rectangle Drawing Tool
    - [ ] Circle Drawing Tool
    - [ ] Dedicated Pan Tool mode

- [ ] **Phase 12: G-Code Simulation**
    - [ ] Toolpath preview overlay
    - [ ] Amber cutting path (#D7BA7D)
    - [ ] Animation controls

- [ ] **Phase 13: Application Polish**
    - [ ] Application Menu (File, Edit, View, Help)
    - [ ] File operations (New, Open, Save)
    - [ ] Undo/redo functionality
    - [ ] Export options (DXF, PDF, SVG)
    - [ ] Full keyboard shortcuts
    - [ ] End-to-End Testing

---

## 📝 MVP Definition
- ✅ Import DXF
- ✅ View and move parts
- ⏳ Auto-nest parts on sheet
- ⏳ Generate G-code
- ⏳ Basic user feedback (cursor, status)

**Next:** Phase 4 StatusBar - Immediate UX improvement
