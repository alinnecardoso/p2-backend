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

app.use("/users", userRoutes);

module.exports = app;