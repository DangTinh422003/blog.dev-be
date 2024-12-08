import bcrypt from 'bcrypt';
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from '@/core/error.response';
import { OkResponse } from '@/core/success.response';
import tokenService from '@/services/token.service';
import { JwtPayload } from 'jsonwebtoken';
import userRepo from '@/repository/user.repo';
import accountRepo from '@/repository/account.repo';

class AccessService {
  async signUp({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
  }) {
    const SALT = 10;
    const hashPassword = await bcrypt.hash(password, SALT);

    const [newUser, newAccount] = await Promise.all([
      userRepo.createUser({
        email,
        fullName: username,
      }),
      accountRepo.createAccount({
        email,
        password: hashPassword,
      }),
    ]);

    if (!newUser || !newAccount) {
      throw new BadRequestError('Create account failed');
    }

    return new OkResponse('Create account successfully');
  }

  async signIn({ email }: { email: string }) {
    const userHolder = await userRepo.findUserByEmail(email);
    if (!userHolder) {
      throw new ForbiddenError('User is not found');
    }

    const [accessToken, refreshToken] = await Promise.all([
      tokenService.generateToken(
        userHolder,
        process.env.ACCESS_TOKEN_PRIVATE_KEY!,
        '3h',
      ),
      tokenService.generateToken(
        userHolder,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!,
        '5s',
      ),
    ]);

    return new OkResponse('Login successfully', {
      user: userHolder,
      token: {
        accessToken,
        refreshToken,
      },
    });
  }

  async refreshToken(refreshToken: string) {
    try {
      const { iat, exp, ...decoded }: JwtPayload =
        await tokenService.verifyToken(
          refreshToken,
          process.env.REFRESH_TOKEN_PRIVATE_KEY!,
        );

      const [newAccessToken, newRefreshToken] = await Promise.all([
        tokenService.generateToken(
          decoded,
          process.env.ACCESS_TOKEN_PRIVATE_KEY!,
          '3h',
        ),
        tokenService.generateToken(
          decoded,
          process.env.REFRESH_TOKEN_PRIVATE_KEY!,
          '5s',
        ),
      ]);

      return new OkResponse('', {
        userInfo: decoded,
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
