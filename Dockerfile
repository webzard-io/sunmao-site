FROM node:14-alpine as builder
WORKDIR /app
COPY . .
RUN yarn && NODE_OPTIONS=--max_old_space_size=4096 yarn vite build
FROM scratch
COPY --from=builder /app/dist /app/dist
