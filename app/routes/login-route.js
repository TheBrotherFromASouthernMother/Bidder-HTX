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


const db = pgp({
  connectionString: 'postgres://qgauodbyzimumj:4071b5334860231f7881bb907f5fbc9e9fad3e60b9c759cd8bdac0214daf670d@ec2-54-83-204-6.compute-1.amazonaws.com:5432/d5df5c8pc330kr',
  ssl: true
});


router.use(bodyParser.urlencoded({ extended: false }));

router.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        <form class="" action="/login" method="post">
          <input type="text" name="email" value="" placeholder="username">
          <input type="password" name="password" value="" placeholder="password">
          <button type="submit" name="button"></button>
        </form>
      </body>
    </html>
    `)
})

router.post('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  }
  let {email, password} = req.body;
  console.log(email, password);
  db.one('SELECT * FROM users WHERE email = $1', [email]).then( data => {
    bcrypt.compare(password, data.password).then(function(result) {
      // res == true
      console.log("Password match:", result);
      if (result === true) {
      req.session.user = data.email;
      res.redirect('/');
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
