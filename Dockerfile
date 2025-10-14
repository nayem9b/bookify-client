# -------- Stage 1: Builder --------
FROM node:18-alpine AS builder

WORKDIR /myapp

# Copy dependency manifests
COPY package.json yarn.lock ./

# Install dependencies with legacy peer deps for compatibility
RUN yarn install --frozen-lockfile --non-interactive --no-progress --legacy-peer-deps

# Copy source code
COPY . .

# Build the React app (outputs to /myapp/build)
RUN yarn build


# -------- Stage 2: Runtime --------
FROM node:18-alpine AS runner

WORKDIR /myapp

# Copy package files and install only production dependencies
COPY package.json yarn.lock ./
RUN yarn install --production --non-interactive --no-progress --legacy-peer-deps

# Copy build artifacts from builder
COPY --from=builder /myapp/build ./build
COPY --from=builder /myapp/public ./public

# Optional: copy configuration files if you use custom scripts
COPY --from=builder /myapp/.env.local ./ || true

# Create non-root user for security
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

EXPOSE 5000

# Start the app using Yarn
CMD ["yarn", "start"]
