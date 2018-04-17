const express = require('express');
const app = express();


const session = require('express-session');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const passport = require('passport');

const handlebars = require("handlebars");

const exphbs = require('express-handlebars');


const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(require("./routes/login-route.js"));
app.use(require("./routes/payment-route.js"));
app.use(require("./routes/artwork-route.js"));

app.get('/', (req, res, next) => {
  res.send("site under construction");
})


app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

app.get('/payment', function(req, res) {
  res.render('payment');
})

app.listen(port, ()=> {
  console.log(`Server listening on port`)
})
