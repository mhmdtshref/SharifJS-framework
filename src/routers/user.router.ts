import { Router } from 'express';
import { UserController } from '../controllers';

const userController = new UserController();

export class UserRouter {
  router = Router();

  constructor() {
    this.router.get('/', userController.index);
  }
}
