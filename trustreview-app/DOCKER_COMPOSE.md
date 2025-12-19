# Guia de Deploy com Docker Compose - Exemplo Flashcards

## Estrutura esperada do projeto

```
/
├── docker-compose.yml
├── flashcards-api/
│   └── Dockerfile
│   └── .env
├── flashcards-app/
│   └── Dockerfile
│   └── .env
│   └── dist/
├── nginx/
│   └── Dockerfile
```

## Exemplo de docker-compose.yml

```yaml
version: "3.8"

services:
  mongodb:
    image: mongo:latest
    container_name: flashcards-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db
    restart: always

  api:
    container_name: flashcards-api
    build: ./flashcards-api
    restart: always
    ports:
      - "5002:5002"
    env_file:
      - ./flashcards-api/.env
    depends_on:
      - mongodb

  app:
    container_name: flashcards-app
    build: ./flashcards-app
    restart: always
    env_file:
      - ./flashcards-app/.env
    depends_on:
      - api

  nginx:
    container_name: flashcards-nginx
    build: ./nginx
    ports:
      - "80:80"
    volumes:
      - ./flashcards-app/dist:/var/www/html
    depends_on:
      - app
      - api
      - mongodb

volumes:
  mongodb-data:
```

## Passos para deploy

1. **Build e start dos containers**
   
   No diretório raiz do projeto, execute:
   ```sh
   docker-compose up --build -d
   ```

2. **Acompanhar logs dos serviços**
   
   ```sh
   docker-compose logs -f
   ```

3. **Parar e remover todos os containers, redes e volumes**
   
   ```sh
   docker-compose down -v
   ```

4. **Atualizar o frontend**
   
   - Gere um novo build do frontend:
     ```sh
     cd flashcards-app
     npm run build
     ```
   - Os arquivos serão automaticamente servidos pelo Nginx, pois o volume `./flashcards-app/dist:/var/www/html` já está mapeado.

## Observações

- O serviço `nginx` serve os arquivos estáticos do frontend.
- O serviço `api` depende do MongoDB e do frontend.
- O volume `mongodb-data` garante persistência dos dados do banco.
- Variáveis de ambiente devem ser configuradas nos arquivos `.env` de cada serviço.

Pronto! Com esse guia, você consegue orquestrar múltiplos serviços usando docker-compose de forma simples e eficiente.