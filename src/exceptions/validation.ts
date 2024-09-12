import { HttpException } from "./root";

export class UnprocessableEntity extends HttpException {
  constructor(error: any, errorCode: number, message: string) {
    super(message, errorCode, 422, error);
  }
}
