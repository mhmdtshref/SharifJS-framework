import { Request, Response } from 'express';
import _ from 'lodash';
import { Cookie } from '../interfaces';

export class CookiesUtil {
  static setCookies = (response: Response, cookiesList: Cookie[]) => {
    cookiesList.forEach((currentCookie) => {
      const options = _.pick(currentCookie, ['age', 'httpOnly']);
      response.cookie(currentCookie.name, currentCookie.value, options);
    });
    return response;
  };

  static getCookies = (request: Request) => {
    return request.cookies;
  };
}
