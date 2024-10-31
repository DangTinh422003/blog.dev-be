import express from 'express';

import accessController from '@/controllers/access.controller';

const accessRouter = express.Router();

accessRouter.post('/sign-up', accessController.signUp);
accessRouter.post('/sign-in', accessController.signIn);

export default accessRouter;
