const {productService} = require("../../services");

class ProductController {
    async getAllProducts(req, res) {
        let result = await productService.getAllProducts();
        res.json(result)
    }

    async getProductById(req, res) {
        const {productId} = req.params;
        let product = await productService.getProductById(productId);
        product === undefined ? res.json(400, 'Not found') : res.json(product);
    }

    async createProduct(req, res) {
        let result = await productService.createProduct(req.body);
        result.status === false ? res.json(400, result) : res.json(result);
    }

    async updateProduct(req, res) {
        let result = await productService.updateProduct(req.body);
        result.status === false ? res.json(400, result) : res.json(result);
    }

    async deleteProduct(req, res) {
        const {productId} = req.params;
        await productService.deleteProduct(productId);
        res.json('Deleted');
    }

}

module.exports = new ProductController;