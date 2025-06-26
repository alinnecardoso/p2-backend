const logger = require("../utils/logger");

const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${req.method} ${req.originalUrl}`;

  // Loga no console e envia ao BetterStack via Winston
  logger.info(logMessage);

  next();
};

module.exports = loggerMiddleware;
