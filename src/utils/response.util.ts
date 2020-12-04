import { Response } from 'express';
import * as httpStatusCodes from 'http-status-codes';
import { Logger } from '../logger';

const { StatusCodes: codes } = httpStatusCodes;

class GeneralResponse {
  success!: boolean;
  constructor(success: boolean) {
    this.success = success;
  }
}

class SuccessResponse extends GeneralResponse {
  data?: unknown;
  message?: string;
  constructor(data: unknown, message: string) {
    super(true);
    this.data = data;
    this.message = message;
  }
}

type ErrorParam = Error | string;
type DataParam = unknown | Promise<unknown>;

class ErrorResponse extends GeneralResponse {
  error!: string;
  constructor(error: ErrorParam) {
    super(false);
    this.error = error instanceof Error ? error.message : error;
  }
}

export class ResponseHandler {
  ok = (response: Response, dataParam?: DataParam, message?: string) => {
    this.resolveSuccessPromise(dataParam)
      .then((data) => {
        response.status(codes.OK).json(new SuccessResponse(data, message || 'Operation succeeded'));
      })
      .catch((error: ErrorParam) => {
        Logger.errorLogger(error);
        this.badRequest(response, error);
      });
  };

  created = (response: Response, dataParam?: DataParam, message?: string) => {
    this.resolveSuccessPromise(dataParam)
      .then((data) => {
        response.status(codes.CREATED).json(new SuccessResponse(data, message || 'Create operation succeeded'));
      })
      .catch((error: ErrorParam) => {
        Logger.errorLogger(error);
        this.badRequest(response, error);
      });
  };

  badRequest = (response: Response, error: ErrorParam) => {
    Logger.errorLogger(error);
    response.status(codes.BAD_REQUEST).json(new ErrorResponse(error));
  };

  notFound = (response: Response, error: ErrorParam) => {
    Logger.errorLogger(error);
    response.status(codes.NOT_FOUND).json(new ErrorResponse(error));
  };

  internalServerError = (response: Response, error: Error) => {
    Logger.errorLogger(error);
    response.status(codes.INTERNAL_SERVER_ERROR).json(new ErrorResponse('Internal server error'));
  };

  unAuthorized = (response: Response, error: ErrorParam) => {
    Logger.errorLogger(error);
    response.status(codes.UNAUTHORIZED).json(new ErrorResponse(error));
  };

  private resolveSuccessPromise = (data: DataParam) => {
    if (data instanceof Promise) {
      return data as Promise<unknown>;
    } else {
      return Promise.resolve(data as unknown);
    }
  };
}
