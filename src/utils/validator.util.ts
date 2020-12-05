import Joi, { Extension, ExtensionFactory } from 'joi';
import { ValidatorOptions } from 'src/interfaces';
import { UserModelConstants } from '../constants';
import _ from 'lodash';
import joiPhoneNumber from 'joi-phone-number';

const joi = Joi.extend(joiPhoneNumber as Extension | ExtensionFactory);

const {
  nameMinLength,
  nameMaxLength,
  emailMinLength,
  emailMaxLength,
  passwordMinLength,
  passwordMaxLength,
} = new UserModelConstants();
export class ValidatorUtil {
  static nameValidator = (options: ValidatorOptions = {}) => {
    let validator = Joi.string();
    const nameOptions: ValidatorOptions = { min: nameMinLength, max: nameMaxLength, ...options };
    validator = ValidatorUtil.setStringOptions(validator, nameOptions);
    return validator;
  };

  static emailValidator = (options: ValidatorOptions = {}) => {
    let validator = Joi.string().email();
    const emailOptions: ValidatorOptions = { min: emailMinLength, max: emailMaxLength, ...options };
    validator = ValidatorUtil.setStringOptions(validator, emailOptions);
    return validator;
  };

  static stringValidator = (options: ValidatorOptions = {}) => {
    let validator: Joi.StringSchema = joi.string();
    validator = ValidatorUtil.setStringOptions(validator, options);
    return validator;
  };

  static numberValidator = (options: ValidatorOptions = {}) => {
    let validator: Joi.NumberSchema = joi.number();
    validator = ValidatorUtil.setNumberOptions(validator, options);
    return validator;
  };

  static dateValidator = (options: ValidatorOptions = {}) => {
    let validator: Joi.DateSchema = joi.date();
    validator = ValidatorUtil.setDateOptions(validator, options);
    return validator;
  };

  static phoneValidator = (options: ValidatorOptions = {}) => {
    let validator = ValidatorUtil.stringValidator(options);
    validator = validator.phoneNumber();
    return validator;
  };

  static passwordValidator = (options: ValidatorOptions = {}) => {
    let validator = Joi.string();
    const passwordOptions = { min: passwordMinLength, max: passwordMaxLength, ...options };
    validator = ValidatorUtil.stringValidator(passwordOptions).pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,120}$/gm
    );
    return validator;
  };

  private static setGeneralOptions = (validator: Joi.Schema, options: ValidatorOptions = {}) => {
    let updatedValidator = _.cloneDeep(validator);
    const { required, nullable } = options;
    if (required) {
      updatedValidator = updatedValidator.required();
    }
    if (nullable) {
      updatedValidator = updatedValidator.allow(null);
    } else {
      updatedValidator = updatedValidator.disallow(null);
    }
    return updatedValidator;
  };

  private static setStringOptions = (validator: Joi.StringSchema, options: ValidatorOptions = {}) => {
    let updatedValidator = ValidatorUtil.setGeneralOptions(validator, options) as Joi.StringSchema;
    const { min, max } = options;
    if (_.isFinite(min)) {
      updatedValidator = updatedValidator.min(min as number);
    }
    if (_.isFinite(max)) {
      updatedValidator = updatedValidator.max(max as number);
    }
    return updatedValidator;
  };

  private static setNumberOptions = (validator: Joi.NumberSchema, options: ValidatorOptions = {}) => {
    let updatedValidator = ValidatorUtil.setGeneralOptions(validator, options) as Joi.NumberSchema;
    const { min, max } = options;
    if (_.isFinite(min)) {
      updatedValidator = updatedValidator.min(min as number);
    }
    if (_.isFinite(max)) {
      updatedValidator = updatedValidator.max(max as number);
    }
    return updatedValidator;
  };

  private static setDateOptions = (validator: Joi.DateSchema, options: ValidatorOptions = {}) => {
    let updatedValidator = ValidatorUtil.setGeneralOptions(validator, options) as Joi.DateSchema;

    const { min, max } = options;
    if (_.isDate(min)) {
      updatedValidator = updatedValidator.min(min as Date);
    }
    if (_.isDate(max)) {
      updatedValidator = updatedValidator.max(max as Date);
    }
    return updatedValidator;
  };
}
