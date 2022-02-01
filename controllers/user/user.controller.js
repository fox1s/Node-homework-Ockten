const {userService} = require("../../services");

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const result = await userService.getUsers();
            res.json(result);
        } catch (e) {
            res.json(e)
        }
    },
    getUserById: async (req, res) => {
        try {
            const {userId} = req.params;
            const result = await userService.getUsersById(userId);
            res.json(result);
        } catch (e) {
            res.json(e);
        }
    },

    createUser: async (req, res) => {
        try {
            const result = await userService.createUser(req.body);
            res.json(201, result);
            // res.sendStatus(201);
        } catch (e) {
            res.json(e);
        }
    },

    updateUser: async (req, res) => {
        const {userId} = req.params;
        try {
            const [isUpdated] = await userService.updateUser(userId, req.body);
            isUpdated ? res.sendStatus(200) : res.json({updated: false});
        } catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params;
        try {
            const isDeleted = await userService.deleteUser(userId);
            isDeleted ? res.sendStatus(204) : res.json({deleted: false})
        } catch (e) {
            res.json(e);
        }
    },
}