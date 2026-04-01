# ==========================================
# Stage 1: Build the React app
# ==========================================
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code
COPY . .

# Build the React app (creates /app/dist folder)
# VITE_API_URL is set here because Vite embeds env vars at BUILD time
ARG VITE_API_URL=http://localhost:4002
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ==========================================
# Stage 2: Serve with Nginx web server
# ==========================================
FROM nginx:alpine

# Copy the built files to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]