# Stage 1: Build frontend and backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies for building
RUN npm ci

# Copy source code
COPY . .

# Build Vite client and Express server bundle
RUN npm run build

# Stage 2: Production runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy manifests and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY public ./public

# Railway injects $PORT at runtime
EXPOSE 3000

CMD ["node", "dist/server.cjs"]
