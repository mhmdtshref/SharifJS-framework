import { Server as HttpServer } from 'http';
import { Application } from 'express';

export class Server {
  private server: HttpServer;

  constructor(app: Application) {
    this.server = new HttpServer(app);
  }

  run = (): void => {
    this.listen();
  };

  private listen = (): void => {
    this.server.listen(5000, (): void => {
      console.log(`Server is running on http://localhost:5000/`);
    });
  };
}
