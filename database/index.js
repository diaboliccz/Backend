const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'softdev',
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database.');
    }
})

module.exports = pool.promise();