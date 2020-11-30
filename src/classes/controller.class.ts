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
          responseHandler.ok(response, data, `${model.pluralClassName} retrieved successfully`);
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
            return responseHandler.ok(response, row, `${model.className} retrieved successfully`);
          } else {
            return responseHandler.notFound(response, `${model.className} not found`);
          }
        })
        .catch((error: Error) => {
          responseHandler.internalServerError(response, error);
        });
    };

    create = (request: Request, response: Response) => {
      const data = _.pick(request.body, Object.keys(model.rawAttributes));
      (model.create(data) as Promise<Model>)
        .then((record) => {
          responseHandler.created(response, record, `${model.className} created successfully`);
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
              responseHandler.ok(response, data, `${model.className} updated successfully`);
            });
          } else {
            return responseHandler.notFound(response, `${model.className} not found`);
          }
        })
        .catch((error: Error) => {
          responseHandler.internalServerError(response, error);
        });
    };

    destroy = (request: Request, response: Response) => {
      const { id } = request.params;
      (model.findByPk(id) as Promise<Model | null>)
        .then((record) => {
          if (record) {
            return record.destroy().then(() => {
              responseHandler.ok(response, null, `${model.className} deleted successfully`);
            });
          } else {
            return responseHandler.notFound(response, `${model.className} not found`);
          }
        })
        .catch((error: Error) => {
          responseHandler.internalServerError(response, error);
        });
    };
  };
};
