import { Router } from 'express';

export class HelloRouter {
  router = Router();

  constructor() {
    this.router.get('/', (req, res) => res.json('Hello World!'));
  }
}
