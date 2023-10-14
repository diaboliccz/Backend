const express = require('express');
const mysql = require('mysql2');

const app = express();

const initRoutes = require('./src/routes/web');

const jwt = require('jsonwebtoken');
const secret = 'softdev';

global.__basedir = __dirname;
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
app.use(express.json());

const payload = {
    user_email: 'u1@ex.com',
    uid: 1,
}

const token = jwt.sign(payload, secret, { expiresIn: '1h' });
console.log(token);
const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})