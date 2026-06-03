import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3001;
const distPath = path.resolve(__dirname, '../../dist');
const hasFrontendBuild = fs.existsSync(path.join(distPath, 'index.html'));
const isProd =
  process.env.NODE_ENV === 'production' ||
  Boolean(process.env.RAILWAY_ENVIRONMENT) ||
  hasFrontendBuild;

const app = express();

app.use(
  cors({
    origin: isProd ? false : true,
    credentials: true,
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);

if (isProd && hasFrontendBuild) {
  app.use(express.static(distPath));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  console.log(`Serving frontend from ${distPath}`);
} else if (!hasFrontendBuild) {
  console.warn(`Frontend build not found at ${distPath}`);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `API server listening on 0.0.0.0:${PORT} (NODE_ENV=${process.env.NODE_ENV ?? 'unset'}, frontend=${hasFrontendBuild})`,
  );
});
