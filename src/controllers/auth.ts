import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as Jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { LoginSchema, SignUpSchema } from "../schema/user";
import { NotFoundException } from "../exceptions/not-found";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignUpSchema.parse(req.body);
  const { name, email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user)
    next(
      new BadRequestsException(
        "User already exist",
        ErrorCodes.USER_ALREADY_EXISTS
      )
    );
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.send(user);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  LoginSchema.parse(req.body);
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user)
    throw new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND);
  if (!compareSync(password, user.password))
    throw new BadRequestsException(
      "Wrong Password",
      ErrorCodes.INCORRECT_PASSWORD
    );
  const token = Jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );
  res.send({ user, token });
};
