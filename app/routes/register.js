const router = require('express').Router();

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const promise = require('bluebird');

const initOptions = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);


const db = pgp('postgres://qgauodbyzimumj:4071b5334860231f7881bb907f5fbc9e9fad3e60b9c759cd8bdac0214daf670d@ec2-54-83-204-6.compute-1.amazonaws.com:5432/d5df5c8pc330kr');


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
          <input type="text" name="email" value="" placeholder="username">
          <input type="password" name="password" value="" placeholder="password">
          <button type="submit" name="button"></button>
        </form>
      </body>
    </html>`)
})

router.post('/register', (req, res) => {
  console.log(req.body)
  let email = req.body.email;
  let password = req.body.password;
  let hashedpwd = null;
    try {
      db.one('SELECT * FROM users WHERE username = $1', [email]).then( ()=> {
        console.log('username already exists')
      }).catch( err => {
        bcrypt.hash(password, saltRounds).then( (hash) => {
          hashedpwd = hash;
          db.any('INSERT INTO users(id, username, password) VALUES ($1, $2, $3)', [11, email, hashedpwd]).then( data => {
           console.log(data, 'saved to database')
         })
        }).catch(err => {
          console.log(err)
        });

      }) //end of insert into db if user not found

    } catch(err) {
      console.log(err, 'goose1')
    } //end try catch
})


module.exports = router;
