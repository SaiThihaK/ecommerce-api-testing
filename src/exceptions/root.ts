// message,status Code,Error Codes,error

export class HttpException extends Error {
  message: string;
  errorCode: ErrorCodes;
  statusCode: number;
  error: any;

  constructor(
    message: string,
    errorCode: ErrorCodes,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  UNAUTHORIZED_ERROR = 1004,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_ERROR = 3001,
}
