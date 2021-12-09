module.exports = (req, res, next) => {
    try {
        const {name, login, pass, age} = req.body;

        if (login.length < 9) {
            console.log('1')
            throw new Error('Password is too short');
        }
        if (age < 1 || age > 130) {
            console.log('2')
            throw new Error('Age is not valid');
        }
        if (!name || !login || !age || !pass) {
            console.log('3')
            throw new Error('User is not valid');
        }
        next();
    } catch (e) {
        console.log(e)
        res.json(e.message)
    }

};