const express = require("express");
const userRoutes = require("./routes/user.routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger.config");

const app = express();

app.use(express.json());

// Rota Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Aplica o logger em todas as rotas
app.use(loggerMiddleware);

const logger = require("./utils/logger");

logger.info("🚀 Teste de log no BetterStack");
logger.error("❌ Erro de teste BetterStack");
logger.warn("⚠️ Atenção, algo pode dar errado");

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use("/users", userRoutes);

module.exports = app;