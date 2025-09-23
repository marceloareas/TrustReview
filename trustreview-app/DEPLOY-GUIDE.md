# Guia de Deploy - TrustReview App

# Instala dependências e gera os arquivos de produção do frontend
build-app:
    cd app && docker build -t trustreview-app .

# Constrói a imagem Docker do Nginx personalizada
build-nginx:
    cd nginx && docker build -t nginx-trustreview .

# Cria a rede Docker para comunicação entre containers
create-network:
    docker network create trustreview-net

# Inicia o container Nginx, mapeando porta e volume
run-nginx:
    docker run -d --name nginx-container -v trustreview:/var/www/html -p 80:80 --network trustreview-net nginx-trustreview

# Copia os arquivos gerados do frontend para dentro do container Nginx
copy-dist:
    docker cp app/dist/. nginx-container:/var/www/html/

# Remove o container e a rede para limpeza do ambiente
clean:
    -docker rm -f nginx-container
    -docker network rm trustreview-net

# Fluxo completo de build e deploy
deploy: build-app build-nginx create-network run-nginx copy-dist
 
## Como atualizar o frontend com o container rodando

1. Gere o novo build do frontend:
    cd app
    npm run build

2. Copie os arquivos gerados para dentro do container:
    docker cp app/dist/. nginx-container:/var/www/html/

O Nginx começa a servir o novo conteúdo imediatamente, sem precisar reiniciar o container.