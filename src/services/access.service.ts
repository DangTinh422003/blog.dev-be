import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';

import { ConflictError, UnauthorizedError } from '@/core/error.response';
import { OkResponse } from '@/core/success.response';
import accountModel from '@/models/account.model';
import userModel from '@/models/user.model';
import tokenService from '@/services/token.service';
import { validateEmail } from '@/utils/index';

class AccessService {
  async createAccount({
    password,
    confirmPassword,
    email,
  }: {
    password: string;
    confirmPassword: string;
    email: string;
  }) {
    if (!email || !password || !confirmPassword) {
      throw new ConflictError('Email, password or confirm password is missing');
    }

    if (!validateEmail(email)) {
      throw new ConflictError('Email is invalid');
    }

    if (password !== confirmPassword) {
      throw new ConflictError('Password and confirm password are not match');
    }

    const emailCheck = await userModel.findOne({ email }).lean();

    if (emailCheck) {
      throw new ConflictError('Email is already taken');
    }

    const SALT = 10;
    const hashPassword = await bcrypt.hash(password, SALT);

    const newUser = await userModel.create({
      email,
    });

    const newAccount = await accountModel.create({
      email,
      password: hashPassword,
    });

    const { password: userPwd, ...newAccountWithoutPassword } =
      newAccount.toObject();

    return new OkResponse(
      {
        user: newUser,
        account: newAccountWithoutPassword,
      },
      'Create account successfully',
    );
  }

  async login({ email, password }: { email: string; password: string }) {
    if (!email || !password) {
      throw new ConflictError('Email or password is missing');
    }

    if (!validateEmail(email)) {
      throw new ConflictError('Email is invalid');
    }

    const userInfo = await userModel.findOne({ email }).lean();
    if (!userInfo) {
      throw new ConflictError('Email is not found');
    }

    const accountInfo = await accountModel.findOne({ email }).lean();
    if (!accountInfo) {
      throw new ConflictError('Account is not found');
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      accountInfo.password,
    );
    if (!isPasswordMatch) {
      throw new ConflictError('Password is incorrect');
    }

    const [accessToken, refreshToken] = await Promise.all([
      tokenService.generateToken(
        userInfo,
        process.env.ACCESS_TOKEN_PRIVATE_KEY!,
        '3h',
      ),

      tokenService.generateToken(
        userInfo,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!,
        '7 days',
      ),
    ]);

    return new OkResponse(
      {
        user: userInfo,
        token: {
          accessToken,
          refreshToken,
        },
      },
      'Login successfully',
    );
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token is missing');
    }

    try {
      const { exp, iat, ...refressTokenDecoded }: JwtPayload =
        await tokenService.verifyToken(
          refreshToken,
          process.env.REFRESH_TOKEN_PRIVATE_KEY!,
        );

      if (!refressTokenDecoded.email) {
        throw new UnauthorizedError('Refresh token is invalid');
      }

      const [newAccessToken, newRefreshToken] = await Promise.all([
        tokenService.generateToken(
          refressTokenDecoded,
          process.env.ACCESS_TOKEN_PRIVATE_KEY!,
          '3h',
        ),

        tokenService.generateToken(
          refressTokenDecoded,
          process.env.REFRESH_TOKEN_PRIVATE_KEY!,
          '7 days',
        ),
      ]);

      return new OkResponse({
        userInfo: refressTokenDecoded,
        token: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      throw new UnauthorizedError('Refresh token is invalid');
    }
  }
}

const accessService = new AccessService();
export default accessService;
