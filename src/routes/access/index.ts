import { handleError } from '@/middlewares/handleError';
import express from 'express';
import accessController from '@/controllers/access.controller';

const accessRouter = express.Router();

accessRouter.post('/sign-up', handleError(accessController.signUp));
accessRouter.post('/sign-in', handleError(accessController.signIn));

export default accessRouter;
