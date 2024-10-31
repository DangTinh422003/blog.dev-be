import express from 'express';

import { isAuthenticated } from '@/middlewares/authentication';
import { handleError } from '@/middlewares/handleError';
import accessRouter from '@/routes/access';

const router = express.Router();

router.use('/access', accessRouter);
router.use('/test', handleError(isAuthenticated), (req, res, next) => {
  res.send('test');
});

export default router;
