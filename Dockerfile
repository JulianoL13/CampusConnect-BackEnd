# Stage 1: Build the application
FROM node:22.9.0-alpine AS builder

# Set the working directory
WORKDIR /app


# Copy package.json e package-lock.json
COPY package*.json ./

# Install dependencies, incluindo as devDependencies para a construção
RUN npm install

# Copy the entire server directory
COPY . .

# Generate Prisma Client and build the TypeScript code
RUN npx prisma generate
RUN npm run build

# Stage 2: Create the production image
FROM node:22.9.0-alpine AS production

# Install OpenSSL to ensure compatibility with prisma
RUN apk update && apk add openssl

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "public/index.js"]
