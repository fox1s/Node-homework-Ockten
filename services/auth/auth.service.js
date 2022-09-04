const db = require('../../dataBase/index').getInstance();
// const {modelName: {PRODUCT}} = require("../../constants");


module.exports = {
    getTokensByParams: (params) => {
        const TokenModel = db.getModel('Token');
        return TokenModel.findOne({where: params});
    },

    createTokenPair: (tokens) => {
        const TokenModel = db.getModel('Token');
        return TokenModel.create(tokens);
    },

    deleteByParams: (params) => {
        const TokenModel = db.getModel('Token');
        return TokenModel.destroy({where: params});
    }
}
