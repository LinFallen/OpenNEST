# OpenNEST

<div align="center">

**Precision CAD/CAM Nesting Software**

A professional desktop application for DXF part nesting and G-Code generation.

[![Electron](https://img.shields.io/badge/Electron-v28-47848F?logo=electron)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-000000?logo=three.js)](https://threejs.org/)

</div>

---

## 📐 Overview

OpenNEST is a cross-platform CAD/CAM software designed for precision part nesting and CNC machine preparation. Built with modern web technologies, it provides an industrial-grade interface for importing DXF files, optimizing material layouts, and generating production-ready G-Code.

### Key Features

- 🎯 **DXF Import**: Parse and visualize industry-standard DXF files
- 🧩 **Smart Nesting**: Automatic part placement with material optimization
- 🔧 **G-Code Generation**: Export CNC-ready toolpath instructions
- 🎨 **Professional UI**: Dark engineering theme with Fluent Design
- ⚡ **Hardware Accelerated**: WebGL-based rendering for smooth interactions
- 💾 **Cross-Platform**: Works on Windows, macOS, and Linux

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Desktop Framework** | Electron + Vite |
| **UI Framework** | React 18 + TypeScript |
| **Component Library** | Fluent UI v9 |
| **3D Rendering** | Three.js + @react-three/fiber |
| **State Management** | Redux Toolkit |
| **Geometry Engine** | DXF Parser + Custom Algorithms |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/LinFallen/OpenNEST.git
cd OpenNEST

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Build platform-specific installers
npm run build:win   # Windows
npm run build:mac   # macOS
npm run build:linux # Linux
```

---

## 📂 Project Structure

```
OpenNEST/
├── src/
│   ├── main/           # Electron main process
│   ├── preload/        # Preload scripts
│   └── renderer/       # React application
│       ├── components/ # UI components
│       ├── store/      # Redux slices
│       ├── utils/      # Utilities (DXF parser, G-Code generator)
│       └── assets/     # Static assets
├── resources/          # App icons and resources
├── build/              # Build configuration
└── docs/               # Documentation
```

---

## 🎨 Design Philosophy

**"Precision at Fingertips"**

OpenNEST embraces a **Dark Engineering** aesthetic, inspired by professional CAD tools and development environments. The interface prioritizes:

- **Clarity**: High contrast for precise visual feedback
- **Efficiency**: Keyboard shortcuts and streamlined workflows
- **Reliability**: Industrial-grade stability and performance

See [DESIGN_SPEC.md](./DESIGN_SPEC.md) for detailed design guidelines.

---

## 📋 Development Roadmap

- [x] Phase 1: Project initialization and tooling
- [ ] Phase 2: UI foundation and theme implementation
- [ ] Phase 3: Canvas and DXF rendering
- [ ] Phase 4: Nesting algorithm and G-Code generation
- [ ] Phase 5: Testing and refinement

For detailed task breakdown, see [task.md](./task.md).

---

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines before submitting PRs.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🌟 Acknowledgments

- **Fluent UI** for the component system
- **Three.js** for 3D rendering capabilities
- **dxf-parser** for DXF file handling
- **Electron** for cross-platform desktop support

---

<div align="center">

**Made with ⚡ by the OpenNEST Team**

[Report Bug](https://github.com/LinFallen/OpenNEST/issues) · [Request Feature](https://github.com/LinFallen/OpenNEST/issues)

</div>
