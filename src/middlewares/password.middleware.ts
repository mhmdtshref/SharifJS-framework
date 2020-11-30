import { NextFunction, Request, Response } from 'express';
import { EncryptionUtil, ResponseHandler } from '../utils';

const { generateHash } = new EncryptionUtil();
const responseHandler = new ResponseHandler();

export class PasswordMiddleware {
  encrypt = (request: Request, response: Response, next: NextFunction) => {
    const password: string = request.body.password as string;
    generateHash(password)
      .then((hash: string) => {
        request.body.password = hash;
        next();
      })
      .catch((error: Error) => {
        responseHandler.internalServerError(response, error);
      });
  };
}
