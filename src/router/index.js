const { Router } = require("express");

const { authRouter } = require("../domains/auth/controller/auth.controller");
const { userRouter } = require('../domains/user/controller/user.controller');
const { productRouter } = require('../domains/product/controller/product.controller');
const { cartRouter } = require("../domains/cart/controller/cart.controller");

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);

module.exports = router;