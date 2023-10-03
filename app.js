const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require('./routes/auth.router');
const reportRouter = require('./routes/report.router');

app.use('/auth', authRouter);
app.use('/report', reportRouter);

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})