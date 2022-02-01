const express = require('express');

const db = require('./dataBase').getInstance();
db.setModels();

const router = require("./routes");

const app = express();

app.use(express.json()); //вчимо ноду читати json
app.use(express.urlencoded()); // розширяє json + читання url

// app.use('/users', userRouter);
// app.use('/products', productRouter);
app.use(router);

app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server running at http://127.0.0.1:5000`);
    }
});



