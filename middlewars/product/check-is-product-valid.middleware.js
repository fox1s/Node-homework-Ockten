module.exports = (req, res, next) => {
    try {
        const {name, price, count} = req.body;

        if (name.length < 2) {
            throw new Error('Name is too short');
        }
        if (price <= 0) {
            throw new Error('Price is not valid');
        }
        if (!name || !price || !count) {
            throw new Error('Product is not valid');
        }
        next();
    } catch (e) {
        console.log(e)
        res.json(e.message)
    }

};