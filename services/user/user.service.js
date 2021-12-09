const path = require("path");
const fs = require("fs").promises;

const DBPath = path.join(process.cwd(), 'usersDB.txt');

class UserService {
    constructor() {
        this.getAllUser = this.getAllUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.getUserById = this.getUserById.bind(this);
        // this.updateUser = this.updateUser.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);
    }

    async getAllUser() {
        let users = [];
        const usersJson = await fs.readFile(DBPath).then(value => value.toString()).catch(err => console.log(err));
        const usersArrJson = usersJson.split('\n');
        usersArrJson.forEach(userJson => {
            if (!userJson) {
                return
            }
            users.push(JSON.parse(userJson))
        });

        return users

    }

    async getUserById(userId) {
        const allUser = await this.getAllUser();
        return allUser.find(user => user.id === Number(userId));
    }

    async deleteUser(userId) {
        const allUser = await this.getAllUser();
        const filteredUser = allUser.filter(user => user.id !== Number(userId));
        await fs.writeFile(DBPath, '');
        await filteredUser.forEach(user => fs.appendFile(DBPath, `\n${JSON.stringify(user)}`));
    }

    async updateUser(user) {
        await this.deleteUser(user.id);
        return await this.createUser(user, user.id);
    }

    async createUser(user, userId) {
        let users = await this.getAllUser();
        user.id = userId || users.reduce((acc, value) => acc.id > value.id ? acc.id : value.id) + 1;

        let isUserExist = users.find(value => value.login === user.login);
        if (isUserExist !== undefined) {
            return {status: false, describe: 'User already exist'}
        }
        let result;
        await fs.appendFile(DBPath, `\n${JSON.stringify(user)}`).then(value => result = {
            status: true,
            describe: 'OK'
        }).catch(err => {
            console.log(err);
            result = {status: false, describe: 'Something went wrong'};
        });

        return result
    }
}

module.exports = new UserService;