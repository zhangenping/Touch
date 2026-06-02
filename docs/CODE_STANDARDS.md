# 代码规范

## 命名

- React 组件：`PascalCase`（如 `VideoPlayer.tsx`）
- Hooks：`use` 前缀 + `camelCase`（如 `useSiteContent`）
- CSS 类名：`kebab-case`（如 `video-player__controls`）
- `site.json` 字段：`camelCase`

## TypeScript

- 所有站点数据必须有 `src/types/site.ts` 类型定义
- 禁止使用 `any`；未知结构使用 `unknown` 并收窄
- 组件 Props 使用 `interface` 或 `type` 显式声明

## 组件职责

- **展示组件**：只接收 props，不直接 import `site.json`
- **页面组件**：通过 `useSiteContent()` 获取数据
- **Layout**：只负责导航、页脚与 `<Outlet />`

## 样式

- 颜色仅通过 `src/styles/variables.css` 中的 CSS 变量
- 不写内联 magic number 颜色（`#000` 等应走变量）
- 移动端断点：768px、1024px（与 `global.css` 一致）

## 资源

- 静态文件只放在 `public/`，引用路径以 `/` 开头
- 图片提供有意义的 `alt` 文本（来自 `site.json` 或组件 props）
- 视频必须提供 `poster` 与控件 `aria-label`

## Git 提交（若使用）

- `feat:` 新功能
- `fix:` 修复
- `docs:` 文档
- `style:` 仅样式
- `refactor:` 重构

## 无障碍

- 导航当前项：`aria-current="page"`
- 图标按钮：必须有 `aria-label`
- 视频控件：键盘可操作（空格播放/暂停）
