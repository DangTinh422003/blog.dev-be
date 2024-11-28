import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from '@/core/error.response';
import userModel from '@/models/user.model';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import accountModel from '@/models/account.model';
import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref('password'),
  username: Joi.string().required(),
});

class AccessValidation {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { email, password, confirmPassword, username } = req.body;

    const { error } = schema.validate({
      email,
      password,
      confirmPassword,
      username,
    });

    if (error) {
      throw new BadRequestError(error.message);
    }

    const emailCheck = await userModel.findOne({ email }).lean();
    if (emailCheck) {
      throw new ConflictError('Email is already taken');
    }

    next();
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const { error } = schema.validate({
      email,
      password,
    });

    if (error) {
      throw new BadRequestError(error.message);
    }

    const accountHolder = await accountModel.findOne({ email }).lean();
    if (!accountHolder) {
      throw new BadRequestError('Email or password is incorrect');
    }

    const isMatch = await bcrypt.compare(password, accountHolder.password);
    if (!isMatch) {
      throw new BadRequestError('Email or password is incorrect');
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token is missing');
    }

    next();
  }
}

const accessValidation = new AccessValidation();
export default accessValidation;
