const { Router } = require("express");

const { authRouter } = require("../domains/auth/controller/auth.controller");
const { userRouter } = require('../domains/user/controller/user.controller');
const { productRouter } = require('../domains/product/controller/product.controller');
const { cartRouter } = require("../domains/cart/controller/cart.controller");
const authenticated = require("../utils/auth");

const router = Router();

router.use('/auth', authRouter);
router.use('/user', authenticated, userRouter);
router.use('/product', productRouter);
router.use('/cart', authenticated, cartRouter);

module.exports = router;