const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/comment', (req, res) => {
    const commentText = req.body.commentText;
    res.send(`<p>New comment: ${commentText}</p>`);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});