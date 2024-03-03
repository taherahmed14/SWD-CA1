const express = require('express');
const bodyParser = require('body-parser');
const escape = require('escape-html');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
    message: 'Too many request. Please try again later.'
}); //To mitigate Denial of service attacks

app.use(limiter);

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/comment', (req, res) => {
    const commentText = req.body.commentText;

    const secureComment = escape(commentText); //To mitigate Reflected cross-site scripting

    res.send(`<p>New comment: ${secureComment}</p>`);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});