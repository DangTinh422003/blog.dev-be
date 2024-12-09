import express from 'express';

import { isAuthenticated } from '@/middlewares/authentication';
import { handleError } from '@/middlewares/handleError';
import accessRouter from '@/routes/access';
import userRouter from '@/routes/user';
import postRouter from '@/routes/post';

const router = express.Router();
const authMiddleware = handleError(isAuthenticated);

router.use('/access', accessRouter);
router.use('/user', authMiddleware, userRouter);
router.use('/post', authMiddleware, postRouter);
router.get('/test', authMiddleware, (req, res) => {
  res.send('oke');
});

export default router;
