require("dotenv").config();
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "p2-backend" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// Só adiciona o transport HTTP se estiver com variáveis definidas
if (process.env.BETTERSTACK_HOST && process.env.BETTERSTACK_TOKEN) {
  logger.add(
    new winston.transports.Http({
      host: process.env.BETTERSTACK_HOST.replace(/^https?:\/\//, ""), // remove http:// ou https://
      path: `/logs/${process.env.BETTERSTACK_TOKEN}`,
      port: 443,
      ssl: true,
    })
  );
}

module.exports = logger;
