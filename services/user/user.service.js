const db = require('../../dataBase').getInstance();
//також можна класом
module.exports = {
    getUsers: () => {
        const UserModel = db.getModel('User');
        return UserModel.findAll();
    },

    getUsersById: async (userId) => {
        const UserModel = db.getModel('User');
        // const user = await UserModel.findOne({where: {id: userId}});
        const user = await UserModel.findByPk(userId);
        return user === null ? 'Not found!' : user;
    },

    createUser: (user) => {
        const UserModel = db.getModel('User');
        return UserModel.create(user)
    },

    updateUser: (userId, user) => {
        const UserModel = db.getModel('User');
        return UserModel.update({...user}, {where: {id: userId}});
    },

    deleteUser: (userId) => {
        const UserModel = db.getModel('User');
        return UserModel.destroy({where: {id: userId}})
    }


};