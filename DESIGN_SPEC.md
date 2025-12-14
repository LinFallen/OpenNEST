# OpenNEST 产品设计规范 (Product Design Specification)

## 1. 产品设计愿景 (Design Vision)

**核心理念**: "Precision at Fingertips" (触手可及的精准)
OpenNEST 不仅仅是一个软件工具，它是连接数字设计与物理制造的精密仪表。像高端卡尺一样，它应该给人以**冷静、可靠、专业**的感觉。

**设计关键词**:
*   **Industrial (工业感)**: 深色调，高对比度，减少视觉干扰。
*   **Minimalist (极简)**: 功能优先，隐藏不必要的装饰。
*   **Responsive (响应式)**: 每一个操作都有即时的视觉或触觉反馈。

---

## 2. 视觉风格定义 (Visual Style)

### 2.1 色彩系统 (Color Palette)
采用 **"Dark Engineering"** 深色模式作为默认主题，以减少长时间注视屏幕的疲劳，并突出几何线条。

*   **UI 背景色 (Deep Space)**:
    *   `Background`: `#1E1E1E` (主背景)
    *   `Panel`: `#252526` (侧边栏与工具栏)
    *   `Border`: `#3E3E42` (分割线)
*   **品牌主色 (Tech Blue)**:
    *   `Primary`: `#007ACC` (用于强调、主按钮、选中状态 - 呼应 VS Code 或工程蓝)
    *   `Hover`: `#1F8AD2`
*   **功能色 (Functional)**:
    *   `Geometry Lines`: `#E0E0E0` (亮白色 - 几何轮廓)
    *   `Construction Lines`: `#6E7681` (辅助线)
    *   `Cutting Path (G-Code)`: `#D7BA7D` (琥珀色 - 模拟刀具路径/警告)
    *   `Error/Collision`: `#F14C4C` (红色 - 碰撞检测)

### 2.2 排版 (Typography)
*   **字体家族**: `Inter`, `Segoe UI` (Windows), `San Francisco` (macOS).
*   **代码/数值**: `JetBrains Mono` 或 `Consolas`。在涉及坐标、尺寸、G-Code 预览时，**必须**使用等宽字体以确保对齐。
*   **层级**:
    *   H1/Headers: 14px Uppercase, Tracking +1px (增加间距，营造工业标签感)
    *   Body: 12px/14px (高密度信息展示)

### 2.3 图标与纹理 (Iconography & Texture)
*   使用 **线性图标 (Stroke Icons)**，如 Fluent UI System Icons 或 Lucide React。
*   线条粗细统一为 1.5px 或 1px，保持锐利。
*   背景可选用非常淡的 **网格 (Grid)** 纹理，暗示 "工程图纸"。

---

## 3. 界面布局原型 (Layout Prototype)

界面采用经典的 **"三段式 + 顶部工具流"** 布局，最大化中间的绘图区域。

### 3.1 顶部：命令与工具栏 (Command & Toolbar)
*   **左侧**: 品牌 Logo + 紧凑菜单 (File, Edit, View)。
*   **中部**: 核心工具条 (Select, Line, Circle, Import, Nesting)。采用图标+Tooltip形式。
*   **右侧**: 状态指示器 (连接状态, 当前单位 mm/inch)。

### 3.2 左侧：资源管理器 (Asset Manager)
*   **项目概览 (Project Tree)**: 显示当前导入的所有零件 (Parts) 列表。
*   **零件库 (Part Library)**: 缩略图模式，允许用户直接**拖拽**零件到中央画布。
*   **层级控制 (Layers)**: DXF 图层管理。

### 3.3 中部：无限画布 (Infinite Canvas)
*   **交互**: 这是一个基于 WebGL (Three.js) 的视口。
*   **视觉元素**:
    *   深灰色无限网格背景。
    *   原点 (0,0) 明确标记。
    *   **材料板 (Sheet)**: 一个高亮的矩形区域，代表实际的切割板材。
*   **操作**: 滚轮缩放，右键平移，左键框选。

### 3.4 右侧：属性与控制 (Properties & Control)
*   **属性面板 (Inspector)**: 选中物体时显示。
    *   位置 (X, Y), 尺寸 (W, H), 旋转 (Angle).
    *   输入框支持直接数学运算 (如 "100/2")。
*   **加工参数 (Machining)**: 刀具直径 (Tool Dia), 进给率 (Feed Rate)。
*   **生成面板 (Action Panel)**: 放置 "Start Nesting", "Generate G-Code" 等大尺寸主行动按钮。

### 3.5 底部：状态栏 (StatusBar)
*   UI 显式坐标。
*   显示当前操作提示 ("Press ESC to cancel drawing")。
*   显示 G-Code 生成进度条。

---

## 4. 关键交互流程 (Key UX Flows)

### 4.1 导入与排版 (Import & Nesting)
1.  用户拖拽 `.dxf` 文件进入窗口。
2.  左侧列表出现新零件。
3.  用户在“材料设置”中定义板材大小 (如 2400x1200mm)。
4.  点击 **"Auto Nest" (自动排样)**。
5.  系统播放轻微的计算动画，零件自动在画布的板材区域内重新排列。
6.  动画结束，显示利用率 (Utilization: 85%)。

### 4.2 G-Code 生成 (Generation)
1.  排样满意后，点击右下角 **"Generate G-Code"**。
2.  界面切换至 "Simulate Mode" (模拟模式)。
3.  琥珀色线条按顺序动态绘制，模拟刀头移动。
4.  完成后弹出 "Export" 对话框。

---

## 5. 技术实现建议 (Implementation Notes)
*   **Fluent UI Theme**: 定制 Fluent UI 的 Theme Provider，覆盖默认的蓝色为我们的 "Tech Blue"，并将背景色强制为深色系。
*   **Golden Layout**: 考虑使用类似 `golden-layout` 或 `mosaic` 的库来实现可拖拽调整大小的面板，增强专业感。
*   **Canvas**: Three.js 的 Canvas 需要处理好 `resize` 事件，保持像素比为 1:1，避免线条模糊。
