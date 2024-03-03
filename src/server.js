//Question-4
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user-register', (req, res) => {

    try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let mobile = req.body.mobile;
        let email = req.body.email;
        let password = req.body.password;

        const queryCheck = `SELECT * FROM users WHERE email = ${email}`;
        db.query(queryCheck, (err, result) => {
            if (err) {
                console.error(err);
                res.send({
                    status: 500,
                    message: "Internal Server Error"
                })
            }
            if (result.length > 0) {
                res.send({
                    status: 400,
                    message: "User already exists"
                })
            }
        });

        const queryInsert = `INSERT INTO tbluser (firstName, lastName, mobile, email, password) 
        VALUES ('${firstName}', '${lastName}', '${mobile}', '${email}', '${password}')`;
        db.query(queryInsert, (err, result) => {
            if (err) {
                console.error(err);
                res.send({
                    status: 500,
                    message: "Internal Server Error"
                })
            }
            else {
                res.send({
                    status: 200,
                    message: "User created successfully"
                })
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

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});