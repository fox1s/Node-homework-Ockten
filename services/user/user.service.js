const db = require('../../dataBase').getInstance();
const {modelName: {USER}} = require("../../constants");

//також можна класом
module.exports = {
    getUsers: () => {
        const UserModel = db.getModel(USER);
        return UserModel.findAll();
    },

    getUsersById: async (userId) => {
        const UserModel = db.getModel(USER);
        // const user = await UserModel.findOne({where: {id: userId}});
        const user = await UserModel.findByPk(userId);
        return user === null ? 'Not found!' : user;
    },

    getUserByParams: (params) => {
        const UserModel = db.getModel(USER);
        return UserModel.findOne({where: params});
    },

    createUser: (user) => {
        const UserModel = db.getModel(USER);
        return UserModel.create(user)
    },

    updateUser: (userId, user) => {
        const UserModel = db.getModel(USER);
        return UserModel.update({...user}, {where: {id: userId}});
    },

    deleteUser: (userId) => {
        const UserModel = db.getModel(USER);
        return UserModel.destroy({where: {id: userId}})
    }


};