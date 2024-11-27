const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const database = require('C:/Users/Carl .A Mokgosi/Desktop/Coding Projects/Supplier Info/SOURCE-CODE/BACK-END/DATABASE/Database');

router.post("/authentication/login", (req, res) => {
    const { email, password } = req.body;

    database.query('SELECT * FROM registration WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length === 0) {
            return res.render('LOGIN/Login', {
                message: 'Email is incorrect'
            });
        }
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (!isMatch) {
            return res.render('LOGIN/Login', {
                message: 'Password is incorrect'
            });
        }

        // Save user info to session
        req.session.user = { id: results[0].id, email: results[0].email };
        res.redirect('http://localhost:8000/Dashboard');
    });
});

module.exports = router;
