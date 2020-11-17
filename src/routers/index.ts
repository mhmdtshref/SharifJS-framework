import express, { Router } from 'express';
import { HelloRouter } from './hello.router';

export class AppRouter {
  router = express();
  helloRouter: Router = new HelloRouter().router;

  constructor() {
    this.useRouters();
  }

  useRouters = () => {
    this.router.use('/hello', this.helloRouter);
  };
}
