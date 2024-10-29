import express from "express";

import accessRouter from "@/routes/access";

const router = express.Router();

router.use("/access", accessRouter);

export default router;
