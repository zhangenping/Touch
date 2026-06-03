#!/bin/sh
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "FATAL: DATABASE_URL is not set."
  echo "Railway: add PostgreSQL, then set DATABASE_URL on the Touch service (or click 'Set DATABASE_URL and JWT_SECRET')."
  exit 1
fi

if [ -z "$JWT_SECRET" ]; then
  echo "FATAL: JWT_SECRET is not set."
  echo "Railway: add JWT_SECRET in Touch service Variables (random string, 32+ chars)."
  exit 1
fi

echo "Running database migrations..."
npx prisma migrate deploy --schema=server/prisma/schema.prisma

echo "Starting API server on port ${PORT:-3001}..."
exec node server/dist/index.js
