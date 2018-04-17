const express = require('express');
const app = express();

const session = require('express-session');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const handlebars = require("handlebars");

const port = process.env.PORT || 3000;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "cats",
                  resave: true,
                  saveUninitialized: false
 }));



app.use(require("./routes/login-route.js"));

app.get('/', (req, res, next) => {
  res.send("site under construction");
})


app.post('/login', )


app.listen(port, ()=> {
  console.log(`Server listening on port`)
  console.log(handlebars)
})
