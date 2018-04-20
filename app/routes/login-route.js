const router = require('express').Router();

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require("../app.js").db;

router.use(bodyParser.urlencoded({ extended: false }));


router.get('/login', (req, res) => {
    // redirect if user is logged in already
    if (req.session.user) {
      res.redirect('/auction');
  } else {
      res.render('layouts/login')
  }
})

router.post('/login', (req, res) => {

  let {email, password} = req.body;

  db.one('SELECT * FROM users WHERE email = $1', [email]).then( data => {
    //check if user account exists, then compare stored password with input password
    bcrypt.compare(password, data.password).then(function(result) {
      // res == true
      console.log("Password match:", result);
      // Add user data to session
      if (result === true) {
      req.session.user = {
        email: data.email,
        userId: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        verified: data.verified
      };
      res.redirect('/auction');
      } else {
        res.send('Incorrect password')
      }
    });
  }).catch( err => {
    console.log('Oh no there is an error', err)
    res.send(`Oh no there is an error ${err}`)
  })
})


module.exports = router;
