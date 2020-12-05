import { NextFunction, Request, Response } from 'express';
import { ValidatorUtil, ResponseHandler } from '../utils';
import _ from 'lodash';
import moment from 'moment';
import Joi from 'joi';

const responseHandler = new ResponseHandler();

export class UserValidator {
  private static firstName = ValidatorUtil.nameValidator();
  private static lastName = ValidatorUtil.nameValidator();
  private static email = ValidatorUtil.emailValidator();
  private static password = ValidatorUtil.passwordValidator();
  private static birthdate = ValidatorUtil.dateValidator({ max: moment().toDate() });

  static validateData = (request: Request, response: Response, next: NextFunction) => {
    const { body: data } = request;
    const schema = _.pick(UserValidator, ['firstName', 'lastName', 'email', 'password', 'birthdate']);
    const { errors } = Joi.object(schema).validate(data);

    if (errors) {
      responseHandler.badRequest(response, errors);
    } else {
      next();
    }
  };
}
