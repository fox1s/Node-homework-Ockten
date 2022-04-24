const bcrypt = require("bcrypt");
const ErrorHandler = require('../error/ErrorHandler');

module.exports = async (hashedPassword, password) => {
    const isPasswordsEquals = await bcrypt.compare(password, hashedPassword);
    console.log(isPasswordsEquals);
    if (!isPasswordsEquals) {
        throw new ErrorHandler('User is not exist');
    }

}