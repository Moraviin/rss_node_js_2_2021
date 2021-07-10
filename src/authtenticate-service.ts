import express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './common/config';
import { UnauthorizedException } from '@nestjs/common';

export const hashPassword = (password: string): string => {
  const salt = '$2b$10$dmmMg/zq0gqtaZ1Nw5DdfO';
  return bcrypt.hashSync(password, salt);
};

export const validateRequest = (request) => {
  const exceptionRoutes = ['/', '/doc', '/login'];

  const path = request.path || request.routerPath;

  if (exceptionRoutes.includes(path)) {
    return true;
  }

  const authToken = request.headers['authorization']?.split(' ')[1];

  try {
    if (!authToken) throw new Error();

    jwt.verify(authToken, JWT_SECRET_KEY);
  } catch {
    throw new UnauthorizedException();
  }
  return true;
};

export default validateRequest;
