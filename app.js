const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const authRouter = require('./routes/auth.router');
const reportRouter = require('./routes/report.router');

app.post('/test', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

app.use('/auth', authRouter);
app.use('/report', reportRouter);

const PORT = 3333;

// app.get('/', (req, res) => {
//     res.json({ status: 'ok', message: 'Welcome to the server' });
// })

// app.post('/test', (req, res) => {
//     console.log(req.params);
//     res.json(req.params);
// })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})