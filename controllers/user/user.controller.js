const {userService} = require("../../services");

module.exports = {
    getAllUsers: async (req, res) => {
        // res.render('userList', {user: await getUser()});
        let users = await userService.getUsers();
        res.json(users);
    },
    getUserById: async (req, res) => {
        const {userId} = req.params;
        let user = await userService.getUserById(userId);

        user === undefined ? res.json(400, 'Not found') : res.json(user);
    },
    createUser: async (req, res) => {
        try {
            let result = await userService.createUser(req.body);
            res.json(result);
        } catch (e) {
            res.json(e);
        }
        // result.status === false ? res.json(400, result) : res.json(result);
    },

    updateUser: async (req, res) => {
        let result = await userService.updateUser(req.body);
        console.log(result)
        result.status === false ? res.json(400, result) : res.json(result);
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params;
        await userService.deleteUser(userId);
        res.json('видалено');
    },
}