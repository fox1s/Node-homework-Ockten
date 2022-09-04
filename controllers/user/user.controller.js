const {userService} = require("../../services");
const {hashPassword, checkHashPasswords} = require("./../../helpers");
const {ErrorHandler} = require("./../../error");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const result = await userService.getUsers();
            res.json(result);
        } catch (e) {
            next(new ErrorHandler(e.message));
            // res.json(e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const result = await userService.getUsersById(userId);
            res.json(result);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    createUser: async (req, res, next) => {
        try {
            req.body.password = await hashPassword(req.body.password);
            const result = await userService.createUser(req.body);
            res.json(201, result);
            // res.sendStatus(201);
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    updateUser: async (req, res, next) => {
        const {userId} = req.params;
        try {
            const {email, password} = req.body;

            // знову ж таки. Де ця перевірка має бути. В мідлварці чи тут?
            const user = await userService.getUserByParams({email});
            if (!user) {
                return next(new ErrorHandler('User is not found', 404));
            }
            ////////////////////////
            req.body.password = await hashPassword(password);

            const [isUpdated] = await userService.updateUser(userId, req.body);
            isUpdated ? res.sendStatus(200) : next(new ErrorHandler('Not updated', 444));
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    deleteUser: async (req, res, next) => {
        const {userId} = req.params;
        try {
            const isDeleted = await userService.deleteUser(userId);
            isDeleted ? res.sendStatus(204) : next(new ErrorHandler('Not deleted', 444));
        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    loginUser: async (req, res, next) => {
        // try {
        const {email, password} = req.body;

        const user = await userService.getUserByParams({email});
        console.log(user)
        if (!user) {
            return next(new ErrorHandler('User is not found', 404, 4041));
        }

        await checkHashPasswords(user.password, password);

        res.json(user);
    }
    // catch (e) {
    //     res.json(e.message);
    // }
    // }


}