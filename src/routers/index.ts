import express, { Router } from 'express';
import { AuthRouter } from './auth.router';
import { HelloRouter } from './hello.router';
import { UserRouter } from './user.router';

const { router: helloRouter } = new HelloRouter();
const { router: userRouter } = new UserRouter();
const { router: authRouter } = new AuthRouter();

export class AppRouter {
  router = express();

  constructor() {
    this.useRouters();
  }

  useRouters = () => {
    this.router.use('/hello', helloRouter);
    this.router.use('/users', userRouter);
    this.router.use('/auth', authRouter);
  };
}
