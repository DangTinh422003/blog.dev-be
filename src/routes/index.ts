import express from 'express';

import { isAuthenticated } from '@/middlewares/authentication';
import { handleError } from '@/middlewares/handleError';
import accessRouter from '@/routes/access';

const router = express.Router();

router.use('/access', accessRouter);
router.get('/test', handleError(isAuthenticated), (req, res) => {
  res.send({
    test: 'Test Data',
  });
});

export default router;
