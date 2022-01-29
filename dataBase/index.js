// const mysql2 = require('mysql2');
//
// let connection = mysql2.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'shop'
// });
//
// module.exports = connection;

const {Sequelize, DataTypes} = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize('shop', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql'
        });

        let models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'models');

        function getModels() {
            fs.readdir(path.join(process.cwd(), 'dataBase', 'models'), (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    const modelFile = require(path.join(modelsPath, modelName));
                    models[modelName] = modelFile(client, DataTypes);
                    // models[modelName] = client.import(path.join(process.cwd(), 'dataBase', 'models', modelName));
                })
            })
        }


        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        }

    }


    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    }
})();