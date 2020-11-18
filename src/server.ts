import { Server as HttpServer } from 'http';
import { Application } from 'express';
import { EnvConstants } from './constants';
import dotenv from 'dotenv';

dotenv.config();

const { port, host } = new EnvConstants();

export class Server {
  private server: HttpServer;

  constructor(app: Application) {
    this.server = new HttpServer(app);
  }

  run = (): void => {
    this.listen();
  };

  private listen = (): void => {
    this.server.listen(port, (): void => {
      console.log(`Server is running on  ${host}:${port}`);
    });
  };
}
