const path = require("path");
const fs = require("fs").promises;

const DBPath = path.join(process.cwd(), 'usersDB.txt');

class UserService {
    constructor () {
        this.getUser = this.getUser.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    async getUser() {
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

    async createUser(user) {
        let users = await this.getUser();

        let isUserExist = users.find(value => value.login === user.login);
        if (isUserExist !== undefined) {
            return {status: false, describe: 'User already exist'}
        }
        let result;
        await fs.appendFile(DBPath, `\n${JSON.stringify(user)}`).then(value => result = {status: true, describe: 'OK'}).catch(err => {
            console.log(err);
            result = {status: false, describe: 'Something went wrong'};
        });

        return result
    }
}

module.exports = new UserService;