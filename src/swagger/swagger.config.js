const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuários",
      version: "1.0.0",
      description: "Documentação da API de CRUD de usuários",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Onde estão suas anotações Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
