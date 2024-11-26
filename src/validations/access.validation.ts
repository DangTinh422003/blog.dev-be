import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from '@/core/error.response';
import userModel from '@/models/user.model';
import { validateEmail } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import accountModel from '@/models/account.model';

class AccessValidation {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { email, password, confirmPassword, username } = req.body;

    if (!email || !password || !confirmPassword || !username) {
      throw new BadRequestError('Fields are missing');
    }

    if (!validateEmail(email)) {
      throw new BadRequestError('Email is invalid');
    }

    if (password !== confirmPassword) {
      throw new BadRequestError('Password and confirm password are not match');
    }

    const emailCheck = await userModel.findOne({ email }).lean();
    if (emailCheck) {
      throw new ConflictError('Email is already taken');
    }

    next();
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Fields are missing');
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
