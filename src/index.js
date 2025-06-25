const app = require("./app");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});

// Encerra conexão do Prisma ao sair
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
