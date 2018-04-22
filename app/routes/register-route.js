const router = require('express').Router();

const bodyParser = require('body-parser');

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const db = require("../app.js").db;

const sendMail = require('../public/js/email.js').sendMail;

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/register', (req, res) => {
  if (req.session.user) {
    res.redirect('/artwork');
  } else {
    res.render('layouts/register');
  }
})

router.post('/register', (req, res) => {
  let {last_name, first_name, email, password} = req.body;
  let hashedpwd = null;
  let activationHash = null;
  if(!verifyRegister(res, last_name, first_name, email, password)) {
    return;
  } else {
    //create unique activationHash
    bcrypt.hash(email, saltRounds).then( hash => {
      activationHash = hash;
    })
  }
    try {
      //check if user has already been saved to database to prevent duplicate registrations
      db.one('SELECT * FROM users WHERE email = $1', [email])
      .then( ()=> {
        console.log('username already exists');
        res.send('username already exists')
      }).catch( err => {

        //if user is not in database, hash their password and saved their data to database
        bcrypt.hash(password, saltRounds)
        .then( (hash) => {
          hashedpwd = hash;
          db.any('INSERT INTO users(id, email, password, last_name, first_name, activation_hash) VALUES (DEFAULT, $1, $2, $3, $4, $5)', [email, hashedpwd, last_name, first_name, activationHash])

          //log the user by storing their id in the session
          .then( data => {console.log('saved to database');
          req.session.user = email;
          sendMail(email);
          res.send('saved')})

        }).catch(err => {
          console.log(err);
          res.send(err)
        }); // end of bcrypt hash

      }) //end of insert into db if user not found

    } catch(err) {
      console.log(err)
      res.send(err);
    } //end try catch
})

module.exports = router;

function testEmail(email) {
  let validator = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return validator.test(email);
}


function verifyRegister (response, lastName, firstName, email, password,) {
  if (lastName.length <= 0) {
    response.send('Please enter a last name');
    return false;
  } else if (firstName.length <= 0) {
    response.send('Please enter a first name');
  } else if (!testEmail(email)) {
    response.send('Please enter a valid email');
  } else if (password.length <= 5) {
    response.send('Please enter a password with six or more characters');
  } else {
    return true;
  }
}
