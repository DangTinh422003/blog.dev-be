import express from 'express';

import { isAuthenticated } from '@/middlewares/authentication';
import { handleError } from '@/middlewares/handleError';
import accessRouter from '@/routes/access';

const router = express.Router();

router.use('/access', handleError(isAuthenticated), handleError(accessRouter));

export default router;
