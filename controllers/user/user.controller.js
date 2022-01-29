const {userService} = require("../../services");

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch (e) {
            res.json(e)
        }
    },
    getUserById: async (req, res) => {
        try {
            const {userId} = req.params;
            const result = await userService.getUsersById(userId);
            res.json(result)
        } catch (e) {
            res.json(e)
        }

    },

    createUser: async (req, res) => {
        try {
            const result = await userService.createUser(req.body);
            res.json(result);
        } catch (e) {
            res.json(e);
        }
    },

    updateUser: async (req, res) => {
        try {
            const result = await userService.updateUser(req.body);
            result[0] === 0 ? res.json(404, 'Not found') : res.json(result);
        } catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params;
        await userService.deleteUser(userId);
        res.json('Deleted');
    },
}