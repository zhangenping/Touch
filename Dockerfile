# Build: docker compose -f docker-compose.prod.yml build
# Mirror: NODE_IMAGE=docker.1ms.run/library/node:22-alpine
ARG NODE_IMAGE=node:22-alpine
FROM ${NODE_IMAGE} AS build
WORKDIR /app
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run db:generate
RUN npm run build

FROM ${NODE_IMAGE}
WORKDIR /app
ENV NODE_ENV=production
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/server/prisma ./server/prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/prisma ./node_modules/prisma
EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy --schema=server/prisma/schema.prisma && node server/dist/index.js"]
