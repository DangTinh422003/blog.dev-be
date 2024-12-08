import accountModel from '@/models/account.model';

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
