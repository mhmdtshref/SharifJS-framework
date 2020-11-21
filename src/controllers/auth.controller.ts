import { Request, Response } from 'express';
import _ from 'lodash';
import { EncryptionUtil, ResponseHandler } from '../utils';
import { User } from '../models';

const responseHandler = new ResponseHandler();

export class AuthController {
  register = (request: Request, response: Response) => {
    const data = _.pick(request.body, Object.keys(User.rawAttributes));
    User.create(data)
      .then((record) => {
        responseHandler.created(response, record, 'User record created successfully');
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
              responseHandler.ok(response, 'Login success');
            } else {
              responseHandler.badRequest(response, 'Incorrect password');
            }
          });
        } else {
          responseHandler.notFound(response, 'No user found with sent email');
        }
      })
      .catch(() => {
        responseHandler.internalServerError(response);
      });
  };
}
