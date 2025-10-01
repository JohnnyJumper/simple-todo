# --- build ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@9.13.2 --activate
RUN pnpm install --frozen-lockfile
COPY . .

# Ensure Prisma client is generated for the build
RUN npx prisma generate
RUN pnpm build

# --- runtime ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# copy only what we need
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./

# tiny entrypoint to run migrations then start
COPY <<'EOF' /app/entrypoint.sh
#!/bin/sh
set -e

# Apply prisma migrations (safe for sqlite; no-op if none)
npx prisma migrate deploy
node dist/main.js
EOF
RUN chmod +x /app/entrypoint.sh
EXPOSE 3000
CMD ["/app/entrypoint.sh"]
