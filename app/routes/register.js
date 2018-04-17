const router = require('express').Router();

const bodyParser = require('body-parser');

const promise = require('bluebird');

const initOptions = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);


const db = pgp({
  database: 'userbase'
});

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
    try {
      db.one('SELECT * FROM users WHERE username = $1', [email]).then( ()=> {
        console.log('username already exists')
      }).catch( err => {
        console.log(err, 'goose1')
        db.any('INSERT INTO users(id, username, password) VALUES ($1, $2, $3)', [4, email, password]).then( data => {
         console.log(data, 'saved to database')
       })
      })

    } catch(err) {
      console.log(err, 'goose1')

    }
})


module.exports = router;
