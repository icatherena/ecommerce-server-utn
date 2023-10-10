import { Router } from "express";

const userRouter = require('./domains/user');

export const router = Router();

router.use('/user', userRouter);