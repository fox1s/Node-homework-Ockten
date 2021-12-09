const express = require('express');
const exprsBars = require('express-handlebars');
const path = require("path");
// const fs = require("fs");
// const fs = require("fs").promises;
// const {getUser, createUser} = require("./services/user.service");
const {userRouter} = require("./routes");

const app = express();

app.use(express.static(path.join(__dirname, 'views'))); //вказуємо статичну папку
app.use(express.json()); //вчимо ноду читати json
app.use(express.urlencoded()); // розширяє json + читання url
app.engine('.hbs', exprsBars.engine({         // встановлює темплейт двіжок + конфіги для роботи з .hbs
    extname: '.hbs',
    defaultLayout: false
}));

app.set('view engine', '.hbs');  // двіжок для відмальовки html
app.set('views', path.join(__dirname, 'views')) // вказує на те де лежать hbs файли

// app.get('/', (req, res) => {
//     res.redirect('/login');
// });
//
// app.get('/login', (req, res) => {
//     res.render('login');
// });
//
// app.get('/register', (req, res) => {
//     res.render('register');
// });
// app.get('/users', async (req, res) => {
//     res.render('userList', {users: await getUser()});
// })


// app.post('/login', async (req, res) => {
//     let {login, pass} = req.body;
//     let parsedUsers = await getUser();
//
//     let isAuthorized = parsedUsers.some(value => value.login === login && value.pass === pass);
//     if (isAuthorized) {
//         return res.redirect('/users')
//     }
//     res.render('error', {message: 'User not found'});
//
//
// })

// app.post('/register', async (req, res) => {
//     let result = await createUser(req.body);
//
//     if (!result.status) {
//         return res.render('error', {message: result.describe});
//     }
//     res.redirect('/login');
// })

app.use('/users', userRouter);

app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server running at http://127.0.0.1:5000`);
    }

});



