const db = require('../../dataBase').getInstance();
//також можна класом
module.exports = {
    getUsers: () => {
        const UserModel = db.getModel('User');
        return UserModel.findAll({});
    },
    getUsersById: (userId) => {
        const UserModel = db.getModel('User');
        return UserModel.findOne({where:{id: userId}})
    },

    createUser: (user) => {
        const UserModel = db.getModel('User');
        return UserModel.create(user)
    },

    // updateUser: (user) => {
    //     const UserModel = db.getModel('User');
    //     return UserModel.updateUser(user)
    // }

};