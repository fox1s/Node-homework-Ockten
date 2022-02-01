const {Router} = require("express");
const {productController} = require("../../controllers");
const {productMiddlewares: {isProductValid, isProductExist}} = require("../../middlewars");
const productRouter = Router();

const route = ['product'];

productRouter.get('/', productController.getProducts);
productRouter.post('/', isProductValid, productController.createProduct);

productRouter.use('/:productId', isProductExist);

productRouter.get('/:productId', productController.getProductById);
productRouter.put('/:productId', isProductValid, productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);

module.exports = productRouter;