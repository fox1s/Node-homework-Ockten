const {Router} = require("express");
const {productController} = require("../../controllers");
const {checkIsProductValid} = require("../../middlewars");
const productRouter = Router();

const route = ['product'];

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:productId', productController.getProductById);
productRouter.post('/', checkIsProductValid, productController.createProduct);
productRouter.put('/', productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);

module.exports = productRouter;