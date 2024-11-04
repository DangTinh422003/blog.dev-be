import express from 'express';

import userController from '@/controllers/user.controller';
import { handleError } from '@/middlewares/handleError';

const userRouter = express.Router();

userRouter.patch('/active', handleError(userController.activeUser));
export default userRouter;
