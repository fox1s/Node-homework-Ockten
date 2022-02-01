module.exports = (req, res, next) => {
    try {
        const {name, price, count, description} = req.body;

        if (name.length < 2) {
            throw new Error('Name is too short');
        }
        if (price <= 0) {
            throw new Error('Price is not valid');
        }
        if (count <= 0) {
            throw new Error('Count is not valid');
        }
        if (!name || !price || !count || !description) {
            throw new Error('Product is not valid');
        }
        next();
    } catch (e) {
        res.json({error: e.message});
    }

};