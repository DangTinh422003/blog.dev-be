import userModel from '@/models/user.model';

class UserRepo {
  async createUser({ email, fullName }: { email: string; fullName: string }) {
    return await userModel.create({ email, fullName });
  }
  async findUserById(id: string) {
    return await userModel.findById(id).lean();
  }
  async findUserByEmail(email: string) {
    return await userModel.findOne({ email }).lean();
  }
}

const userRepo = new UserRepo();
export default userRepo;
