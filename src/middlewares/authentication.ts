import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { GoneError, UnauthorizedError } from '@/core/error.response';
import tokenService from '@/services/token.service';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new UnauthorizedError('Unauthorized');
  }

  try {
    const accessTokenDecoded = await tokenService.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
    );

    req.jwtDecoded = accessTokenDecoded as JwtPayload;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('jwt expired')) {
        throw new GoneError('Token expired! Need to login again');
      }

      throw new UnauthorizedError('Unauthorized, please login again');
    }
  }
};
