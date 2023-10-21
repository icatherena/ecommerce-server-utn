const { Router } = require("express");

//const { authRouter } = require("../domains/auth/controller/auth.controller");
const { userRouter } = require('../domains/user/controller/user.controller');

const router = Router();

//router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;