const {productService} = require("../../services");

class ProductController {
    async getProducts(req, res) {
        try {
            const result = await productService.getProducts();
            res.json(result)
        } catch (e) {
            res.json(e);
        }
    }

    async getProductById(req, res) {
        try {
            // const {productId} = req.params;
            // const result = await productService.getProductById(productId);
            // res.json(result);
            console.log(req.product)
            res.json(req.product)
        } catch (e) {
            res.json(e);
        }

    }

    async createProduct(req, res) {
        try {
            const result = await productService.createProduct(req.body);
            res.json(201, result);
        } catch (e) {
            res.json(e);
        }
    }


    async updateProduct(req, res) {
        try {
            const {productId} = req.params;
            const [isUpdated] = await productService.updateProduct(productId, req.body);
            isUpdated ? res.sendStatus(200) : res.json({updated: false});
        } catch (e) {
            res.json(e);
        }
    }

    async deleteProduct(req, res) {
        try {
            const {productId} = req.params;
            const isDeleted = await productService.deleteProduct(productId);
            isDeleted ? res.sendStatus(204) : res.json({deleted: false});
        } catch (e) {
            res.json(e);
        }
    }

}

module.exports = new ProductController;