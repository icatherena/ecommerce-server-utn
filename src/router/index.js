const { Router } = require("express");

const { authRouter } = require("../domains/auth/controller/auth.controller");
const { userRouter } = require('../domains/user/controller/user.controller');
const { productRouter } = require('../domains/product/controller/product.controller');
const { cartRouter } = require("../domains/cart/controller/cart.controller");
const { checkoutRouter } = require("../domains/checkout/controller/checkout.controller");
const { saleRouter } = require("../domains/sale/controller/sale.controller");

const authenticated = require("../utils/auth");

const router = Router();

router.use('/auth', authRouter);
router.use('/user', /* authenticated, */ userRouter);
router.use('/product', productRouter);
router.use('/cart', /* authenticated, */ cartRouter);
router.use('/checkout', authenticated, checkoutRouter);
router.use('/sale', authenticated, saleRouter);

module.exports = router;