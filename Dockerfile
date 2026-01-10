# -------- Stage 1: Builder --------
FROM node:18-alpine AS builder
WORKDIR /myapp
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN yarn build


# -------- Stage 2: Runtime --------
FROM node:18-alpine AS runner
WORKDIR /myapp

# Install a simple HTTP server for serving static files
RUN npm install -g serve

COPY --from=builder /myapp/build ./build
COPY --from=builder /myapp/public ./public

# Copy entrypoint script that will generate runtime env JS
COPY docker-entrypoint.sh /myapp/docker-entrypoint.sh
RUN chmod +x /myapp/docker-entrypoint.sh

EXPOSE 3000
# Run the entrypoint script to create the runtime env file, then start the static server
CMD ["sh", "-c", "/myapp/docker-entrypoint.sh && serve -s build -l 3000"]
