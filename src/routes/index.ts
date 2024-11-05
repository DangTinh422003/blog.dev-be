import express from 'express';

import { isAuthenticated } from '@/middlewares/authentication';
import { handleError } from '@/middlewares/handleError';
import accessRouter from '@/routes/access';
import userRouter from '@/routes/user';

const router = express.Router();

router.use('/access', accessRouter);
router.use('/user', handleError(isAuthenticated), userRouter);
router.get('/test', handleError(isAuthenticated), (req, res) => {
  res.send('oke');
});

export default router;
