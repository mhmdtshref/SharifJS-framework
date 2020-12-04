import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../utils';

const responseHandler = new ResponseHandler();

export class AuthorizationMiddleware {
  isGuest = (request: Request, response: Response, next: NextFunction) => {
    if (request.cookies.token) {
      responseHandler.unAuthorized(response, new Error('Must be logged out'));
    } else {
      next();
    }
  };
}
