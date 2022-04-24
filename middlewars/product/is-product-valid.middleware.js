const {productValidationSchema} = require("../../validators");
const ErrorHandler = require("../../error/ErrorHandler");
module.exports = (req, res, next) => {
    try {
        const product = req.body;

        const {error} = productValidationSchema.validate(product);
        console.log(error)
        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();
    } catch (e) {
        res.json({error: e.message});
    }

};