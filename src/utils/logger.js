require("dotenv").config();
const { createLogger, format, transports } = require("winston");
const axios = require("axios");

const betterstackTransport = {
  log: (info, callback) => {
    axios.post(process.env.BETTERSTACK_HOST, {
      message: info.message,
      level: info.level,
    }, {
      headers: {
        Authorization: process.env.BETTERSTACK_TOKEN,
        "Content-Type": "application/json",
      },
    }).catch(err => {
      console.error("Erro ao enviar log para BetterStack:", err.message);
    });

    callback();
  },
};

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({ format: format.simple() }),
    betterstackTransport
  ],
});

module.exports = logger;
