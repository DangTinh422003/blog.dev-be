import { Request, Response } from 'express';

import userService from '@/services/user.service';

class UserController {
  // async activeUser(req: Request, res: Response) {
  //   res.send(await userService.activeUser(req.body));
  // }
}

const userController = new UserController();
export default userController;
