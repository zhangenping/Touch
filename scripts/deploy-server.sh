#!/bin/bash
# 在云服务器 Ubuntu 上执行（需已安装 Docker + Docker Compose）
set -e
cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "请先创建 .env：cp .env.production.example .env 并编辑 JWT_SECRET、POSTGRES_PASSWORD"
  exit 1
fi

echo ">> Building and starting production stack..."
docker compose -f docker-compose.prod.yml up -d --build

echo ">> Done."
echo "   访问: http://$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}'):${APP_PORT:-3001}"
echo "   查看日志: docker compose -f docker-compose.prod.yml logs -f app"
