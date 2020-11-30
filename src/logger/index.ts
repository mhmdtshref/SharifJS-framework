import winston from 'winston';

export class Logger {
  static errorLogger = (error: Error | string) => {
    const logger = winston.createLogger({
      level: 'error',
      format: winston.format.errors(),
      transports: new winston.transports.File({
        filename: './src/logger/errors.logs',
        level: 'error',
        format: winston.format.errors(),
      }),
    });
    return logger.error(error instanceof Error ? error : new Error(error));
  };

  static infoLogger = (infoString: unknown) => {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: new winston.transports.File({ filename: './src/logger/info.logs' }),
    });
    return logger.info(infoString);
  };
}
