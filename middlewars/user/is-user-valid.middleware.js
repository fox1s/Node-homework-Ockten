module.exports = (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            throw new Error('User is not valid');
        }

        if (password.length < 8) {
            throw new Error('Password is too short');
        }
        console.log('==========', email.length < 5 || !email.includes('@'))
        if (email.length < 5 || !email.includes('@')) {
            throw new Error('Email is not valid');
        }

        next();
    } catch (e) {
        res.json({error: e.message})
    }

};