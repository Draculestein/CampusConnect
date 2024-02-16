import winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: 'bold red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'white'
};

const level = () => {
    return process.env.LOG_LEVEL || 'info';
};

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  )
winston.addColors(colors);

const logger = winston.createLogger({
    levels: levels,
    level: level(),
    format: format,
});

export default logger;