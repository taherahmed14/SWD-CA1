const express = require('express');
const bodyParser = require('body-parser');
const escape = require('escape-html');
const rateLimit = require('express-rate-limit');
const nodeRSA = require('node-rsa');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
    standardHeaders: true,
	legacyHeaders: false,
    message: 'Too many request. Please try again later.'
});
app.use(limiter);

const rsaKey = new nodeRSA(process.env.privateKey);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/login', (req, res) => {
    let username = rsaKey.decrypt(req.body.username, 'utf8');
    let password = rsaKey.decrypt(req.body.password, 'utf8');

    username = escape(username);
    password = escape(password);

    try {
        const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
        db.query(query, [username, password], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (result.length > 0) {
                const token = jwt.sign({ username }, process.env.secretkey, {
                    expiresIn: '1h',
                });
                res.send({
                    status: 200,
                    message: "Login successful",
                    token
                })
            } else {
                res.send('Invalid username or password');
            }
        });
    }
    catch(error) {
        res.send({
            status: 400,
            message: error
        })
    }
});

// Route to display profile page
app.get('/profile', (req, res) => {
    res.send('Welcome to your profile page!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});