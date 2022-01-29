const db = require('../../dataBase').getInstance();
//також можна класом
module.exports = {
    getUsers: () => {
        const UserModel = db.getModel('User');
        return UserModel.findAll({});
    },

    getUsersById: async (userId) => {
        const UserModel = db.getModel('User');
        const user = await UserModel.findOne({where: {id: userId}});
        return user === null ? 'Not found!' : user;

    },

    createUser: (user) => {
        const UserModel = db.getModel('User');
        return UserModel.create(user)
    },

    updateUser:  (user) => {
        const {id, ...payload} = user;
        const UserModel = db.getModel('User');
        return UserModel.update({...payload}, {where: {id}});


    }

};