# Usa uma imagem oficial do Node como base
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /src

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da API
COPY . .

# ⚠️ Removido: COPY .env .env (Render fornece as variáveis no ambiente)
# Se quiser rodar localmente, use docker-compose com --env-file

# Gera o Prisma Client dentro da imagem
RUN npx prisma generate

# Expõe a porta da sua API
EXPOSE 3000

# Comando para rodar a API
CMD ["npm", "start"]
