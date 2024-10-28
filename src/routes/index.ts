import express from 'express';
import testRouter from '@/routes/test';

const router = express.Router();

router.use('/test', testRouter);

export default router;
