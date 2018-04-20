const router = require('express').Router();

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require("../app.js").db;

router.get('/verification', (req, res) => {
  // if (req.session.user) {
  //   res.redirect('/');
  // }
  res.render('layouts/verification');
  // res.send(`
  //   <!DOCTYPE html>
  //   <html>
  //     <head>
  //       <meta charset="utf-8">
  //       <title></title>
  //     </head>
  //     <body>
  //       <form class="" action="/verification" method="post">
  //         <input type="text" name="email" value="" placeholder="username">
  //         <input type="password" name="password" value="" placeholder="password">
  //         <button type="submit" name="button"></button>
  //       </form>
  //     </body>
  //   </html>
  //   `)
})


router.post('/verification', (req, res) => {
  let {email, password} = req.body;
  db.one('SELECT * FROM users WHERE email = $1', [email])
  .then( data => {
    bcrypt.compare(email, data['activation_hash'])
    .then(result => {
      if (result === false) {
        res.send('There is no username matching that input')
        return;
      }
      db.any('UPDATE users SET verified = TRUE WHERE email = $1', [email])
      .then( ()=> {
        res.send('user has been verified');
        return;
      }).catch( err => {
        console.log(err);
        res.send('there was an error processing your request')
        return;
      });

    }).catch( err => {
      console.log(err);
      res.send("There was an error processing your request")
      return;
    })
  }).catch( err => {
    console.log(err);
    res.send("There was an error processing your request")
    return;
  })
})


module.exports = router;
