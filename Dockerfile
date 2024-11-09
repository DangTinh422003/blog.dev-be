FROM node:18 AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:alpine AS production
RUN mkdir /app

COPY --from=builder /app/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
CMD ["node", "/app/server.js"]
EXPOSE 80
