const {Router} = require("express");
const {userController} = require("../../controllers");
const {checkIsUserValid} = require("../../middlewars");
const userRouter = Router();

const route = ['users'];

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userController.getUserById);
userRouter.post('/',
    // checkIsUserValid,
    userController.createUser);
userRouter.put('/', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);


module.exports = userRouter;

