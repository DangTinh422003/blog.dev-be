import { ConflictError } from '@/core/error.response';
import { OkResponse } from '@/core/success.response';
import userModel from '@/models/user.model';

class UserService {
  async activeUser({ email, newData }: { email: string; newData: any }) {
    try {
      const userHolder = await userModel.findOne({ email }).lean();

      if (!userHolder) {
        throw new ConflictError('User not found');
      }

      const userUpdated = await userModel.findByIdAndUpdate(
        { email },
        { ...newData, isActivated: true },
        { upsert: true },
      );

      return new OkResponse(
        {
          user: userUpdated,
        },
        'User activated successfully',
      );
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}

const userService = new UserService();
export default userService;
