// module.exports.userRouter = require('./user/user.router');
// module.exports.productRouter = require('./product/product.router');

const router = require('express').Router();

const productRouter = require('./product/product.router');
const userRouter = require('./user/user.router');

router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('*', (err, req, res, next) => {
    //має бути з некстом обов'язково!
    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customCode
        })
});

module.exports = router;