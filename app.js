const express = require('express');
const exprsBars = require('express-handlebars');
const path = require("path");

const app = express();

express.static(path.join(__dirname, 'views')); //вказуємо статичну папку
app.use(express.json()); //вчимо ноду читати json
app.use(express.urlencoded()); // розширяє json + читання url
app.engine('.hbs', exprsBars.engine({ // встановлює темплейт двіжок + конфіги для роботи з .hbs
    extname: '.hbs',
    defaultLayout: false
}));

app.set('view engine', '.hbs');  // двіжок для відмальовки html
app.set('views', path.join(__dirname, 'views')) // вказує на те де лежать hbs файли


let users = [
    {name: 'Roman', login: 'roma123', pass: '123'},
    {name: 'Rostyk', login: '1', pass: '1'},
    {name: 'Olga', login: 'olga123', pass: '123'},
]


app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/users', (req, res) => {
    res.render('userList', {users});
})


app.post('/login', (req, res) => {
    let {login, pass} = req.body;
    let isAuthorized = users.some(value => value.login === login && value.pass === pass);
    if (isAuthorized) {
        res.redirect('/users')
    } else {
        res.end('user not found');
    }
})

app.post('/register', (req, res) => {
    users.push(req.body);
    res.redirect('/login');
})

app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server running at http://127.0.0.1:5000`);
    }

});



