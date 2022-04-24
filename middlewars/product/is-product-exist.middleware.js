// const {productValidationSchema} = require("../../validators");
const ErrorHandler = require("../../error/ErrorHandler");
const productService = require('../../services/product/product.service')

module.exports = async (req, res, next) => {

    try {
        const {productId} = req.params;
        if (isNaN(productId) || +productId < 0) return next(new ErrorHandler('Id is not valid', 400))

        const product = await productService.getProductById(productId);
        if (!product) return next(new ErrorHandler('Product is not found', 404))
        //код нижче чуть крінжовий, ми тіпа в мідлварці робим запит в бд і потім в контролерах витягуєм з req об'єкт продукта
        // похожу це лише для прикладу так зробили????
        req.product = product;

        next();
    } catch (e) {
        res.json({error: e.message});
    }

}