// module.exports.userRouter = require('./user/user.router');
// module.exports.productRouter = require('./product/product.router');

const router = require('express').Router();

const productRouter = require('./product/product.router');
const userRouter = require('./user/user.router');
const authRouter = require('./auth/auth.router');

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('*', (err, req, res, next) => {
    //має бути з некстом обов'язково!
    let message = err.message

    if (err.parent) {
        message = err.parent.sqlMessage
    }
    res
        .status(err.status || 400)
        .json({
            message,
            code: err.customCode
        })
});

module.exports = router;