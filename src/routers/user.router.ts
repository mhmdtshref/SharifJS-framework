import { Router } from 'express';
import { UserController } from '../controllers';
import { PasswordMiddleware } from '../middlewares';

const userController = new UserController();
const { encrypt } = new PasswordMiddleware();

export class UserRouter {
  router = Router();

  constructor() {
    this.router.get('/', userController.index);
    this.router.get('/:id(\\d+)', userController.get);
    this.router.post('/', [encrypt], userController.create);
    this.router.put('/:id(\\d+)', userController.update);
    this.router.delete('/:id(\\d+)', userController.destroy);
  }
}
