# Step 1: Use Node.js 22 (matching your local version)
FROM node:22-alpine

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package files first (Docker caches this layer)
COPY package*.json ./

# Step 4: Install all dependencies
RUN npm install --production

# Step 5: Copy all backend source code
COPY . .

# Step 6: Expose port 4002
EXPOSE 4002

# Step 7: Start the backend server
CMD ["node", "index.js"]