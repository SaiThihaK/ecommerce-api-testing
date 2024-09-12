import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token)
    next(
      new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED_ERROR)
    );
  try {
    const payload = jwt.verify(token!, JWT_SECRET);
  } catch (err) {
    next(
      new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED_ERROR)
    );
  }
};
