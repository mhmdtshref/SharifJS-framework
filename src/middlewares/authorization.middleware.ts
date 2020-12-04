import { NextFunction, Request, Response } from 'express';
import { CookiesUtil, ResponseHandler, TokenUtil } from '../utils';

const responseHandler = new ResponseHandler();

export class AuthorizationMiddleware {
  isGuest = (request: Request, response: Response, next: NextFunction) => {
    if (request.cookies.token) {
      responseHandler.unAuthorized(response, new Error('Must be logged out'));
    } else {
      next();
    }
  };

  isLoggedIn = (request: Request, response: Response, next: NextFunction) => {
    const { token } = CookiesUtil.getCookies(request);
    if (!token) {
      responseHandler.unAuthorized(response, new Error('Must be logged in'));
    } else {
      TokenUtil.confirm(token)
        .then((id) => {
          request.app.set('decodedId', id);
          next();
        })
        .catch(() => {
          responseHandler.unAuthorized(response, new Error('Invalid token'));
        });
    }
  };
}
