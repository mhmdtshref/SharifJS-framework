import { Router } from 'express';
import { PasswordMiddleware } from '../middlewares';
import { AuthController } from '../controllers';
import { AuthorizationMiddleware } from 'src/middlewares';

const { isGuest } = new AuthorizationMiddleware();
const { encrypt } = new PasswordMiddleware();
const authController = new AuthController();

export class AuthRouter {
  router = Router();

  constructor() {
    this.router.post('/register', [isGuest, encrypt], authController.register);
    this.router.post('/login', [isGuest], authController.login);
  }
}
