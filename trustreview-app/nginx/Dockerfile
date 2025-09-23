FROM nginx:alpine

# Remove configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf