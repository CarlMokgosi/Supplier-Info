const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const database = require('C:/Users/Carl .A Mokgosi/Desktop/Coding Projects/Supplier Info/SOURCE-CODE/BACK-END/DATABASE/Database');

router.post("/authentication/register", async (req, res) => {    
    const { name, surname, email, password } = req.body;
  
    try {
      const existingUser = await database.query('SELECT email FROM registration WHERE email = ?', [email]);
  
      if (existingUser.length > 0) {
        return res.render('register', {
          message: 'This email is already in use'
        });
      }
  
      //we hash the password before uploading to the database
      let hashedPassword = await bcrypt.hash(password, 8);
  
      await database.query('INSERT INTO registration SET?', { name, surname, email, password: hashedPassword });
  
      res.render('login');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
});
  
module.exports = router;
  