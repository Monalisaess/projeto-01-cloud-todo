# Estágio 1: Build da aplicação React
FROM node:20-alpine AS build

# Instala o git para permitir a clonagem do repositório
RUN apk add --no-cache git

# Clona o repositório do projeto e usa os arquivos do frontend
WORKDIR /repo

# Clona o repositório do projeto diretamente do GitHub
RUN git clone https://github.com/Monalisaess/projeto-01-cloud-todo.git .

WORKDIR /repo/frontend

# Instala todas as dependências (incluindo devDependencies para o build)
RUN npm install

# Executa o build da aplicação
RUN npm run build

# Estágio 2: Servir a aplicação com Nginx
FROM nginx:1.27-alpine

# Copia os arquivos gerados no build anterior para a pasta pública do Nginx
COPY --from=build /repo/frontend/dist /usr/share/nginx/html

# Configura o frontend e encaminha as chamadas da API ao balanceador
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 para acesso web
EXPOSE 80
