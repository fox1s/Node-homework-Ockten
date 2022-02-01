// module.exports.userRouter = require('./user/user.router');
// module.exports.productRouter = require('./product/product.router');

const router = require('express').Router();

const productRouter = require('./product/product.router');
const userRouter = require('./user/user.router');

router.use('/products', productRouter);
router.use('/users', userRouter);

module.exports = router;