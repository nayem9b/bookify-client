# -------- Stage 1: Builder --------
FROM node:18-alpine AS builder
WORKDIR /myapp
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive --no-progress --legacy-peer-deps
COPY . .
RUN yarn build


# -------- Stage 2: Runtime --------
FROM node:18-alpine AS runner
WORKDIR /myapp
COPY package.json yarn.lock ./
RUN yarn install --production --non-interactive --no-progress --legacy-peer-deps
COPY --from=builder /myapp/build ./build
COPY --from=builder /myapp/public ./public
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs
EXPOSE 5000
CMD ["yarn", "start"]
