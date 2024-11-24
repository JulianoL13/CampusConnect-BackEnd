FROM node:22.9.0-alpine AS builder

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:22.9.0-alpine AS production

RUN apk update && apk add openssl

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["node", "public/index.js"]
