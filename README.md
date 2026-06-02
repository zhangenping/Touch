# 游戏开发者简历网站

黑白极简风格作品集，支持简历页、项目展示、自定义视频播放器。内容通过 `content/site.json` 编辑。

## 快速开始

```powershell
cd F:\Touch
npm install
npm run dev
```

浏览器打开 http://localhost:5173

## 编辑内容

- 文案与链接：`content/site.json`
- 图片：`public/assets/images/`
- 视频：`public/assets/videos/`

详细说明见 **`project-info/`** 文件夹内的文本：

| 文件 | 说明 |
|------|------|
| 技术栈说明.txt | 技术选型 |
| 部署与访问步骤.txt | 手机/公网访问 |
| 文件夹结构说明.txt | 目录结构 |
| 内容编辑上传指南.txt | 如何改内容与上传素材 |

代码规范：`docs/CODE_STANDARDS.md`

## 构建与部署

```powershell
npm run build
npm run preview
```

部署到 Vercel 后，手机可通过 `https://xxx.vercel.app` 访问。步骤见 `project-info/部署与访问步骤.txt`。

## 页面

- `/` — 首页
- `/resume` — 简历
- `/projects` — 项目列表
- `/projects/:id` — 项目详情（含视频）
- `/about` — 关于
- `/contact` — 联系
