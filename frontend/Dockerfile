# Estágio 1: Build da aplicação React
FROM node:20-alpine AS build

# Instala o git para permitir a clonagem do repositório
RUN apk add --no-cache git

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Clona o repositório do front-end diretamente do GitHub
RUN git clone https://github.com/EmmanoelMonteiro/to-do-list-react.git .

# Instala todas as dependências (incluindo devDependencies para o build)
RUN npm ci

# Executa o build da aplicação
RUN npm run build

# Estágio 2: Servir a aplicação com Nginx
FROM nginx:1.27-alpine

# Copia os arquivos gerados no build anterior para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração personalizada do Nginx (certifique-se de que o arquivo nginx.conf está no seu repositório GitHub)
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 para acesso web
EXPOSE 80