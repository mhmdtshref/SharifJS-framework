import { Router } from 'express';
import { PasswordMiddleware } from '../middlewares';
import { AuthController } from '../controllers';

const { encrypt } = new PasswordMiddleware();
const authController = new AuthController();

export class AuthRouter {
  router = Router();

  constructor() {
      this.router.post('/register', [encrypt], authController.register);
      this.router.post('/login', authController.login);
  }
}
