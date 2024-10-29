import { validateEmail } from '@/utils/index';
import { ConflictError } from '@/core/error.response';
import { OkResponse } from '@/core/success.response';
import userModel from '@/models/user.model';
import tokenService from '@/services/token.service';
import accountModel from '@/models/account.model';
import bcrypt from 'bcrypt';

class AccessService {
  async createAccount({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) {
    const [emailCheck, usernameCheck] = await Promise.all([
      userModel.findOne({ email }).lean(),
      userModel.findOne({ username }).lean(),
    ]);

    if (emailCheck) {
      throw new ConflictError('Email is already taken');
    }

    if (usernameCheck) {
      throw new ConflictError('Username is already taken');
    }

    const SALT = 10;
    const hashPassword = await bcrypt.hash(password, SALT);

    const newUser = await userModel.create({
      email,
    });

    const newAccount = await accountModel.create({
      username,
      password: hashPassword,
      userId: newUser._id,
    });

    return new OkResponse(newAccount, 'Create account successfully');
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

    const accountInfo = await accountModel
      .findOne({ userId: userInfo._id })
      .lean();
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
      tokenService.generateToken(userInfo, process.env.PRIVATE_KEY!, '3h'),
      tokenService.generateToken(userInfo, process.env.PRIVATE_KEY!, '7d'),
    ]);

    console.log({
      accessToken,
      refreshToken,
    });

    return new OkResponse({}, 'Login successfully');
  }
}

const accessService = new AccessService();
export default accessService;
