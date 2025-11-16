# Multi-stage Dockerfile: first stage builds the frontend, second stage serves it with nginx

# Build frontend
FROM node:18-alpine AS builder
WORKDIR /app

# Install build dependencies
COPY app/package*.json ./
RUN npm ci --silent

# Copy source and build
COPY app/ ./
RUN npm run build

# Nginx stage
FROM nginx:alpine

# Remove default config and add custom one
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Ensure correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html