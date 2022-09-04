const {requestHeadersEnum, responseStatusCodesEnum} = require('../../constants')
const {tokenizer, checkHashPasswords} = require('../../helpers')
const {ErrorHandler, error} = require('../../error')
const {authService, userService} = require('../../services')

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler('NO USER', 404, 4041));
            }

            await checkHashPasswords(user.password, password);

            const tokens = tokenizer();

            await authService.createTokenPair({...tokens, userId: user.id});
            // await authService.createTokenPair(tokens);

            res.json(tokens);
        } catch (e) {
            next(e)
        }
    },

    logoutUser: async (req, res) => {
        const access_token = req.get(requestHeadersEnum.AUTHORIZATION);

        await authService.deleteByParams({access_token});

        res.sendStatus(200);
    },

    refreshToken: async (req, res, next) => {
        // якась помилка падає
        try {
            const refresh_token = req.get(requestHeadersEnum.AUTHORIZATION);
            const userId = req.userId;
            console.log(userId)

            const user = await userService.getUsersById(userId);
            console.log(user)
            if (!user) {
                return next(
                    new ErrorHandler(error.NOT_FOUND.message, responseStatusCodesEnum.NOT_FOUND, error.NOT_FOUND.code)
                )
            }

            const tokens = tokenizer();

            await authService.deleteByParams({refresh_token});
            await authService.createTokenPair(tokens);
            console.log(tokens)
            res.json(tokens);
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
};