import { NextFunction, Request, Response } from "express";
import { InternalException } from "../exceptions/internal-error";
import { ErrorCodes, HttpException } from "../exceptions/root";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (err: any) {
      let exception: HttpException;
      if (err instanceof HttpException) {
        exception = err;
      } else {
        exception = new InternalException(
          "something went wrong",
          err,
          ErrorCodes.INTERNAL_ERROR
        );
      }
      next(exception);
    }
  };
};
