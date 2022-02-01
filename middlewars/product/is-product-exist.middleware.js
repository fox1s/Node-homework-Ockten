module.exports = async (req, res, next) => {

    try {
        const {productId} = req.params;

        if (isNaN(productId) || +productId < 0) throw new Error('Product is not valid')

        next();
    } catch (e) {
        res.json({error: e.message});
    }

}