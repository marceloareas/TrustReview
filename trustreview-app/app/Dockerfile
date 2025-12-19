FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Segunda stage apenas para servir os arquivos estáticos
FROM nginx:alpine

COPY --from=builder /app/dist /var/www/html

# Não precisa de configuração do nginx aqui, o nginx service cuida disso