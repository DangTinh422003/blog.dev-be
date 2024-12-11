import { BadRequestError, ConflictError } from '@/core/error.response';
import { OkResponse } from '@/core/success.response';
import userModel from '@/models/user.model';
import { validateEmail } from '@/utils';

interface ActiveParams {
  email: string;
  username: string;
}

class UserService {
  // async activeUser({ email, username }: ActiveParams) {
  //   if (!email || !username) {
  //     throw new BadRequestError('Missing required fields');
  //   }
  //   if (!validateEmail(email)) {
  //     throw new BadRequestError('Invalid email format');
  //   }
  //   const user = await userModel
  //     .findOneAndUpdate({ email }, { isActive: true, username })
  //     .lean();
  //   if (!user) {
  //     throw new ConflictError('User not found');
  //   }
  //   return new OkResponse(
  //     {
  //       user,
  //     },
  //     'User activated successfully',
  //   );
  // }
}

const userService = new UserService();
export default userService;
