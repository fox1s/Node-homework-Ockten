const db = require('../../dataBase/index').getInstance();
const {modelName: {PRODUCT}} = require("../../constants");


module.exports = {
    getProducts: () => {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.findAll();
    },

    getProductById: (productId) => {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.findByPk(productId);
    },

    createProduct: (product) => {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.create(product);
    },

    updateProduct: (productId, user) => {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.update(user, {where: {id: productId}});
    },

    deleteProduct: (productId) => {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.destroy({where: {id: productId}});
    }
}

// getProducts: () => {
//     const ProductModel = db.getModel(PRODUCT);
//     return ProductModel.findAll();
// }

// getProductById() {
//
// }
//
//
// createProduct() {
//
// }
//
// updateProduct() {
//
// }
//
// deleteProduct() {
//
// }


// const fs = require('fs').promises;
// const path = require("path");
//
// const DBProductsPath = path.join(process.cwd(), 'productsDB.txt');
//
// class ProductService {
//
//     async getAllProducts() {
//         let products = [];
//         const productsJson = await fs.readFile(DBProductsPath).then(result => result.toString()).catch(err => console.log(err));
//         const productsArrJson = productsJson.split('\n');
//
//         productsArrJson.forEach(productJson => {
//             if (!productJson) {
//                 return
//             }
//             products.push(JSON.parse(productJson))
//         })
//
//         return products;
//     }
//
//     async getProductById(productId) {
//         const allProducts = await this.getAllProducts();
//         return allProducts.find(product => product.id === Number(productId));
//     }
//
//     async deleteProduct(productId) {
//         const allProducts = await this.getAllProducts();
//         const filteredProduct = allProducts.filter(product => product.id !== Number(productId));
//         await fs.writeFile(DBProductsPath, '');
//         await filteredProduct.forEach(product => fs.appendFile(DBProductsPath, `\n${JSON.stringify(product)}`));
//     }
//
//     async updateProduct(product) {
//         await this.deleteProduct(product.id);
//         return await this.createProduct(product, product.id);
//     }
//
//     async createProduct(product, productId) {
//         let products = await this.getAllProducts();
//         product.id = productId || products.reduce((acc, value) => (acc.id > value.id ? acc.id : value.id), 0) + 1;
//
//         let isProductExist = products.find(value => value.name === product.name);
//         if (isProductExist !== undefined) {
//             return {status: false, describe: 'Product already exist'}
//         }
//         let result;
//         await fs.appendFile(DBProductsPath, `\n${JSON.stringify(product)}`).then(() => result = {
//             status: true,
//             describe: 'OK'
//         }).catch(err => {
//             console.log(err);
//             result = {status: false, describe: 'Something went wrong'};
//         });
//
//         return result;
//     }
//
// }
//
// module.exports = new ProductService;