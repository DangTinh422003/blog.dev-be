import { accountModel } from '@/models';

class AccountRepo {
  async createAccount({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return await accountModel.create({ email, password });
  }
}

const accountRepo = new AccountRepo();
export default accountRepo;
