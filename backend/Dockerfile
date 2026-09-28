# Imagem base oficial do Node.js (versão LTS recomendada)
FROM node:20-alpine

# Labels de metadados
LABEL maintainer="Emmanoel Monteiro " \
      version="1.0" \
      description="API para Projeto to-do-list-react." \
      created_by="Emmanoel Monteiro"

# Instala o git para permitir a clonagem do repositório
RUN apk add --no-cache git

# Clona o repositório do projeto e usa os arquivos da API
WORKDIR /repo

# Clona o repositório do projeto diretamente do GitHub
RUN git clone https://github.com/Monalisaess/projeto-01-cloud-todo.git .

WORKDIR /repo/backend

# Instala as dependências do projeto (omitindo as de desenvolvimento)
RUN npm install --omit=dev

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "server.js"]
