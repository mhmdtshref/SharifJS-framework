import { Router } from 'express';
import { UserController } from '../controllers';

const userController = new UserController();

export class UserRouter {
  router = Router();

  constructor() {
    this.router.get('/', userController.index);
    this.router.get('/:id(\\d+)', userController.get);
    this.router.post('/', userController.create);
    this.router.put('/:id(\\d+)', userController.update);
    this.router.delete('/:id(\\d+)', userController.destroy);
  }
}
