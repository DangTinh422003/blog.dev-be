import { ConflictError } from '@/core/error.response';
import { OkResponse } from '@/core/success.response';
import userModel from '@/models/user.model';
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
}

const accessService = new AccessService();
export default accessService;
