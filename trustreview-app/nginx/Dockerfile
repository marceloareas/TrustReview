# Build do app React
FROM node:latest AS builder

WORKDIR /app

COPY trustreview-app/app/package*.json ./
RUN npm install

COPY trustreview-app/app .
RUN npm run build

# Nginx servindo os arquivos
FROM nginx:alpine

# Copia o build do React
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração do nginx
COPY trustreview-app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]