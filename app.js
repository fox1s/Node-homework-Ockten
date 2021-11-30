const express = require('express');
const exprsBars = require('express-handlebars');
const path = require("path");
// const fs = require("fs");
const fs = require("fs").promises;

const app = express();

express.static(path.join(__dirname, 'views')); //вказуємо статичну папку
app.use(express.json()); //вчимо ноду читати json
app.use(express.urlencoded()); // розширяє json + читання url
app.engine('.hbs', exprsBars.engine({         // встановлює темплейт двіжок + конфіги для роботи з .hbs
    extname: '.hbs',
    defaultLayout: false
}));

app.set('view engine', '.hbs');  // двіжок для відмальовки html
app.set('views', path.join(__dirname, 'views')) // вказує на те де лежать hbs файли

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/users', async (req, res) => {
    res.render('userList', {users: await readFile()});
})

let readFile = async () => {
    let data = await fs.readFile(path.join(__dirname, 'usersDB.txt'), {encoding: 'utf8'})
    let users = data.split(';');
    users = users.filter(value => value.length > 0)
    return users.map((value) => JSON.parse(value))
}


app.post('/login', async (req, res) => {
    let {login, pass} = req.body;
    let parsedUsers = await readFile();
    console.log(parsedUsers)

    let isAuthorized = parsedUsers.some(value => value.login === login && value.pass === pass);
    if (isAuthorized) {
        res.redirect('/users')
    } else {
        res.end('user not found');
    }

})

app.post('/register', async (req, res) => {
   await fs.appendFile(path.join(__dirname, 'usersDB.txt'), `${JSON.stringify(req.body)};`)
    res.redirect('/login');
})

app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server running at http://127.0.0.1:5000`);
    }

});



