import express, { Router } from 'express';
import { HelloRouter } from './hello.router';
import { UserRouter } from './user.router';

export class AppRouter {
  router = express();
  helloRouter: Router = new HelloRouter().router;
  userRouter: Router = new UserRouter().router;

  constructor() {
    this.useRouters();
  }

  useRouters = () => {
    this.router.use('/hello', this.helloRouter);
    this.router.use('/users', this.userRouter);
  };
}
