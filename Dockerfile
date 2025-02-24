# Build stage
FROM --platform=linux/amd64 node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build

# Production stage
FROM --platform=linux/amd64 node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma/
EXPOSE 8080
CMD ["npm", "run", "start:prod"] 