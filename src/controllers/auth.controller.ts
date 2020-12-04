import { Request, Response } from 'express';
import _ from 'lodash';
import { EncryptionUtil, ResponseHandler, TokenUtil } from '../utils';
import { User } from '../models';
import moment from 'moment';
import { CookiesUtil } from 'src/utils';
import { Cookie } from 'src/interfaces';

const responseHandler = new ResponseHandler();

export class AuthController {
  private expirationDate = moment().add(1, 'year').toDate();

  register = (request: Request, response: Response) => {
    const data = _.pick(request.body, Object.keys(User.rawAttributes));
    User.create(data)
      .then((user) => {
        // Token settings and generation
        const payload = user.id.toString();
        const token = TokenUtil.generate(payload, this.expirationDate);

        // Cookies set to response
        const cookies: Cookie[] = [{ name: 'token', value: token, httpOnly: true }];
        const cookiedResponse = CookiesUtil.setCookies(response, cookies);

        // Send response carrying response
        responseHandler.created(cookiedResponse, user, 'User created successfully');
      })
      .catch((error: Error) => {
        responseHandler.badRequest(response, error);
      });
  };

  login = (request: Request, response: Response) => {
    const { email, password } = _.pick(request.body, ['email', 'password']);
    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          return new EncryptionUtil().compareHash(password, user.password).then((passed) => {
            if (passed) {
              // Token settings and generation
              const payload = user.id.toString();
              const token = TokenUtil.generate(payload, this.expirationDate);

              // Cookies set to response
              const cookies: Cookie[] = [{ name: 'token', value: token, httpOnly: true }];
              const cookiedResponse = CookiesUtil.setCookies(response, cookies);

              responseHandler.ok(cookiedResponse, 'Login success');
            } else {
              responseHandler.badRequest(response, 'Incorrect password');
            }
          });
        } else {
          responseHandler.notFound(response, 'No user found with sent email');
        }
      })
      .catch((error: Error) => {
        responseHandler.internalServerError(response, error);
      });
  };
}
