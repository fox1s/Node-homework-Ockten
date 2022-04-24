
const {userValidationSchema} = require('../../validators');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = (req, res, next) => {
    try {
        const user = req.body;
        const {error} = userValidationSchema.validate(user);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();
    } catch (e) {
        res.json({error: e.message})
    }

};