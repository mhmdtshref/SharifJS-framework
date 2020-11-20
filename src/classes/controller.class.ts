import { Request, Response } from 'express';
import { Model } from 'sequelize';
import { ResponseHandler } from '../utils';
import _ from 'lodash';

const responseHandler = new ResponseHandler();
export const controllerClassGenerator = (model: any) => {
  return class {
    index = (_request: Request, response: Response) => {
      (model.findAll() as Promise<Model[]>)
        .then((data) => {
          responseHandler.ok(response, data, 'Data retrieved successfully');
        })
        .catch((error) => {
          responseHandler.badRequest(response, error);
        });
    };

    get = (request: Request, response: Response) => {
      const { id } = request.params;
      (model.findByPk(id) as Promise<Model | null>)
        .then((row) => {
          if (row) {
            return responseHandler.ok(response, row, 'Record retrieved successfully');
          } else {
            return responseHandler.notFound(response, 'Record not found');
          }
        })
        .catch(() => {
          responseHandler.internalServerError(response);
        });
    };

    create = (request: Request, response: Response) => {
      const data = _.pick(request.body, Object.keys(model.rawAttributes));
      (model.create(data) as Promise<Model>)
        .then((record) => {
          responseHandler.created(response, record, 'Record created successfully');
        })
        .catch((error: Error) => {
          responseHandler.badRequest(response, error);
        });
    };

    update = (request: Request, response: Response) => {
      const { id } = request.params;
      const data = _.pick(request.body, Object.keys(model.rawAttributes));
      (model.findByPk(id) as Promise<Model | null>)
        .then((record) => {
          if (record) {
            return record.update(data).then((data) => {
              responseHandler.ok(response, data, 'Record updated successfully');
            });
          } else {
            return responseHandler.notFound(response, 'Record not found');
          }
        })
        .catch(() => {
          responseHandler.internalServerError(response);
        });
    };

    destroy = (request: Request, response: Response) => {
      const { id } = request.params;
      (model.findByPk(id) as Promise<Model | null>)
        .then((record) => {
          if (record) {
            return record.destroy().then(() => {
              responseHandler.ok(response, null, 'Record deleted successfully');
            });
          } else {
            return responseHandler.notFound(response, 'Record not found');
          }
        })
        .catch(() => {
          responseHandler.internalServerError(response);
        });
    };
  };
};
