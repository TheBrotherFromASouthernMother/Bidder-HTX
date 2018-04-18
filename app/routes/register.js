const router = require('express').Router();

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require("../app.js").db;

const sendMail = require('../email.js').sendMail;

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/register', (req, res) => {
  res.send(`  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        <form class="" action="/register" method="post">
          <input type="text" name="last_name" value="" placeholder="last name">
          <input type="text" name="first_name" value="" placeholder="first name">
          <input type="text" name="email" value="" placeholder="email">
          <input type="password" name="password" value="" placeholder="password">
          <button type="submit" name="button"></button>
        </form>
      </body>
    </html>`)
})

router.post('/register', (req, res) => {

  //TODO: add if-else block to check that user fields are correct;

  let {last_name, first_name, email, password} = req.body;
    if(!verifyLogin(res, last_name, first_name, email, password)) {
      return;
    };
    try {
      db.one('SELECT * FROM users WHERE email = $1', [email])
      .then( ()=> {
        console.log('username already exists');
        res.send('username already exists')
      }).catch( err => {
        bcrypt.hash(password, saltRounds)
        .then( (hash) => {
          hashedpwd = hash;
          db.any('INSERT INTO users(id, email, password, last_name, first_name) VALUES (DEFAULT, $1, $2, $3, $4)', [email, hashedpwd, last_name, first_name]).then( data => {console.log('saved to database');
          req.session.user = email;
          sendMail(email);
          res.send('saved')})

        }).catch(err => {
          console.log(err);
          res.send(err)
        });

      }) //end of insert into db if user not found

    } catch(err) {
      console.log(err, 'goose1')
    } //end try catch
})


module.exports = router;


function testEmail(email) {

let validator = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
return validator.test(email);
}


function verifyLogin (response, lastName, firstName, email, password,) {
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
