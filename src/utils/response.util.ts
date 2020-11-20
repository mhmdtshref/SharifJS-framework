import { Response } from 'express';
import * as httpStatusCodes from 'http-status-codes';

const { StatusCodes: codes } = httpStatusCodes;

export class ResponseHandler {
  handler = (
    promise: Promise<any>,
    response: Response,
    message: string = 'Operation done successfully',
    isCreate = false
  ) => {
    promise
      .then((data: any) => {
        if (!isCreate) {
          response.status(codes.OK).json({
            success: true,
            data,
          });
        } else {
          response.status(codes.CREATED).json({
            success: true,
            data,
          });
        }
      })
      .catch((error) => {
        response.status(codes.BAD_REQUEST).json({
          success: false,
          error: error.message,
        });
      });
  };
}
