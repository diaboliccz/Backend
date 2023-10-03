const pool = require('../database/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'Software_Dev';

const authController = {
    register: async (req, res) => {
        const { email, password } = req.body;

        // Check if email already exists
        const [rows, fields] = await pool.execute(
            'SELECT email FROM users WHERE email = ?',
            [email]
        );

        if (rows.length > 0) {
            // Email is already taken
            res.json({ status: 'error', message: 'Email is already taken' });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await pool.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        res.json({ status: 'ok' });
    }
    login: async (req, res) => {
        const { email, password } = req.body;

        // Check if user exists
        const [rows, fields] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length == 0) {
            res.json({ status: 'error', message: 'No user found' });
            return;
        }

        // Check if password is correct
        const isLogin = await bcrypt.compare(password, rows[0].password);

        if (isLogin) {
            const token = jwt.sign({ email: rows[0].email }, secret, { expiresIn: '1h' });
            res.json({ status: 'ok', message: 'Login success', token });
        } else {
            res.json({ status: 'error', message: 'Login failed' });
        }
    }
    tokenCheck: async (req, res) => {
        const token = req.headers['authorization'];

        if (!token) {
            res.json({ status: 'error', message: 'No token' });
            return;
        }

        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                res.json({ status: 'error', message: 'Invalid token' });
                return;
            }

            const [rows, fields] = await pool.execute(
                'SELECT email FROM users WHERE email = ?',
                [decoded.email]
            );

            if (rows.length == 0) {
                res.json({ status: 'error', message: 'No user found' });
                return;
            }

            res.json({ status: 'ok', message: 'Token is valid' });
        });
    }
};

module.exports = authController;