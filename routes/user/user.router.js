const {Router} = require("express");
const {userController} = require("../../controllers");
const {userMiddlewares: {isUserExist, isUserValid}} = require("../../middlewars");
const userRouter = Router();

const route = ['users'];

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', isUserValid, userController.createUser);
userRouter.post('/auth', userController.loginUser);

userRouter.use('/:userId', isUserExist);

userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId', isUserValid, userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

// userRouter.get('/:userId', isUserExist, userController.getUserById);
// userRouter.put('/:userId', isUserExist, isUserValid, userController.updateUser);
// userRouter.delete('/:userId', isUserExist, userController.deleteUser);


module.exports = userRouter;

