import express from 'express';

import { handleError } from '@/middlewares/handleError';
import { accessController } from '@/controllers';
import { accessValidation } from '@/validations';

const accessRouter = express.Router();

accessRouter.post(
  '/sign-up',
  handleError(accessValidation.signUp),
  handleError(accessController.signUp),
);
accessRouter.post('/sign-in', handleError(accessController.signIn));
accessRouter.delete('/sign-out', handleError(accessController.signOut));
accessRouter.put('/refresh-token', handleError(accessController.refreshToken));

export default accessRouter;
