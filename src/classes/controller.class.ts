import { Request, Response } from 'express';
import { Model } from 'sequelize';
import { ResponseHandler } from '../utils';

const responseHandler = new ResponseHandler();

export const controllerClassGenerator = (model: any) => {
  return class {
    index = (_request: Request, response: Response) => {
      responseHandler.handler(model.findAll() as Promise<Model[]>, response, 'Data retrieved successfully');
    };
  };
};
