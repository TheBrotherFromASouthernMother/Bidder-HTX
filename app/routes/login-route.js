const router = require('express').Router();


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
          <input type="text" name="username" value="" placeholder="username">
          <input type="password" name="password" value="" placeholder="password">
          <button type="submit" name="button"></button>
        </form>
      </body>
    </html>
    `)
})


module.exports = router;
