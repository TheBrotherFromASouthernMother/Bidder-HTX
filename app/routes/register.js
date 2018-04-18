const router = require('express').Router();

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require("../app.js").db;

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
          <input type="text" name="email" value="" placeholder="first name">
          <input type="password" name="password" value="" placeholder="password">
          <button type="submit" name="button"></button>
        </form>
      </body>
    </html>`)
})

router.post('/register', (req, res) => {

  //TODO: add if-else block to check that user fields are correct;

  let {last_name, first_name, email, password} = req.body;
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
