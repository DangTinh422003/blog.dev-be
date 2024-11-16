import express from 'express';

import userController from '@/controllers/user.controller';
import { handleError } from '@/middlewares/handleError';
import { isAuthenticated } from '@/middlewares/authentication';

const userRouter = express.Router();
userRouter.post(
  '/active',
  handleError(isAuthenticated),
  handleError(userController.activeUser),
);

export default userRouter;
