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
COPY prisma ./prisma

# Gera o Prisma Client dentro da imagem
RUN npx prisma generate

# Expõe a porta da sua API
EXPOSE 3000

# Comando para rodar as migrations e iniciar a API
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
