# 游戏开发者简历网站

黑白极简风格作品集，支持**登录/注册**、简历页、项目展示、自定义视频播放器。内容通过 `content/site.json` 编辑。

## 快速开始（全栈本地）

```powershell
cd F:\Touch
copy .env.example .env
npm install
npm run db:up          # 启动 PostgreSQL（需已安装 Docker）
npm run db:generate
npm run db:deploy      # 应用数据库迁移
npm run dev
```

数据库默认：`postgresql://touch:touch_secret@localhost:5432/touch`（见 `docker-compose.yml`）。

浏览器打开 http://localhost:5173 → 先 **/register** 注册，再浏览全站。

> `npm run dev` 会同时启动 Vite 前端与 Express API（3001）。

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

## 构建与生产运行

```powershell
npm run build
npm start
```

访问 http://localhost:3001（API + 前端一体）。

**公网部署（任何电脑可访问）** 见 **`project-info/公网服务器部署步骤.txt`**（云服务器 Docker 一键 / Railway）。

```bash
# 服务器上（Ubuntu）
git clone https://github.com/zhangenping/Touch.git && cd Touch
cp .env.production.example .env   # 编辑 JWT_SECRET、POSTGRES_PASSWORD
docker compose -f docker-compose.prod.yml up -d --build
# 浏览器访问 http://公网IP:3001
```

纯静态无账号版本可参考 `project-info/部署与访问步骤.txt`（仅 Vercel 静态，已不适用登录功能）。

## 页面

- `/` — 首页
- `/resume` — 简历
- `/projects` — 项目列表
- `/projects/:id` — 项目详情（含视频）
- `/about` — 关于
- `/contact` — 联系
- `/login` — 登录
- `/register` — 注册

未登录访问站内页面会跳转到登录页。
