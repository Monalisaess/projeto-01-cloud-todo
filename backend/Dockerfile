# Imagem base oficial do Node.js (versão LTS recomendada)
FROM node:20-alpine

# Labels de metadados
LABEL maintainer="Emmanoel Monteiro " \
      version="1.0" \
      description="API para Projeto to-do-list-react." \
      created_by="Emmanoel Monteiro"

# Instala o git para permitir a clonagem do repositório
RUN apk add --no-cache git

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Clona o repositório diretamente do GitHub para dentro do diretório de trabalho
RUN git clone https://github.com/EmmanoelMonteiro/to-do-list-api.git .

# Instala as dependências do projeto (omitindo as de desenvolvimento)
RUN npm ci --omit=dev

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "server.js"]