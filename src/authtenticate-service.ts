import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './common/config';

export const hashPassword = (password: string): string => {
  const salt = '$2b$10$dmmMg/zq0gqtaZ1Nw5DdfO';
  return bcrypt.hashSync(password, salt);
};

const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authToken = req.header('authorization')?.split(' ')[1];
  try {
    if (!authToken) throw new Error();

    jwt.verify(authToken, JWT_SECRET_KEY);
    next();
  } catch {
    res.status(401).send('Unauthorized');
  }
};

export default authMiddleware;
