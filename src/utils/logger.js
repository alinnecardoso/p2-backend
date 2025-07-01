require("dotenv").config();
const winston = require("winston");
const https = require("https");

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

if (process.env.BETTERSTACK_HOST && process.env.BETTERSTACK_TOKEN) {
  logger.add(
    new winston.transports.Http({
      host: process.env.BETTERSTACK_HOST.replace(/^https?:\/\//, ""),
      path: `/logs/${process.env.BETTERSTACK_TOKEN}`,
      port: 443,
      ssl: true,
      agent: new https.Agent({ keepAlive: true }),
    })
  );

  logger.info("🟢 BetterStack logging configurado com sucesso");
}

module.exports = logger;
