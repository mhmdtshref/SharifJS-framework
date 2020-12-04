import { Response } from 'express';
import { Cookie } from 'src/interfaces';
import _ from 'lodash';

export class CookiesUtil {
  static setCookies = (response: Response, cookiesList: Cookie[]) => {
    cookiesList.forEach((currentCookie) => {
      const options = _.pick(currentCookie, ['age', 'httpOnly']);
      response.cookie(currentCookie.name, currentCookie.value, options);
    });
    return response;
  };
}
