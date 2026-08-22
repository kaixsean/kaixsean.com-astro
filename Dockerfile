# ---- Development Stage ----
FROM node:24-alpine AS dev

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the source
COPY . .

EXPOSE 4321

CMD ["pnpm", "dev", "--host", "0.0.0.0"]


# ---- Build Stage ----
FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build


# ---- Production Stage (static files served via node http-server) ----
FROM node:24-alpine AS prod

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=builder /app/dist ./dist

RUN npm install -g serve

EXPOSE 4321

CMD ["serve", "dist", "-l", "4321"]
