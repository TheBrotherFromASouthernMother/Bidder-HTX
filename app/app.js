const express = require('express');
const app = express();

const session = require('express-session');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

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

module.exports.db = db;

const handlebars = require("handlebars");
handlebars.registerHelper("add", function(num1, num2) {
  return num1 + num2;
});

const exphbs = require('express-handlebars');

// socket.io requires
const path = require('path');
const http = require('http');
const server = http.createServer(app);

// const io = require('socket.io').listen(server);
// server.listen(8000);
// end socket.io requires

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "cats",
                  resave: true,
                  saveUninitialized: false,
                  cookie: {
                    expires: false, //closing the browser will not log the user out
                    maxAge: 1 * 24 * 60 * 60 * 1000 //one day
                  }
 }));


// socket.io server listening and broadcasting for app.js
// io.sockets.on('connection', function(socket) {
//
//   // listen to incoming bids
//   socket.on('bid', function(content) {
//     console.log('bid is: ' + content); // submitted bid is transmitted back to server
//     // echo to the sender
//     socket.emit('bid', content['amount']);
//
//     // broadcast the bid to all clients
//     socket.broadcast.emit('bid', socket.id + 'bid: ' + content['amount']);
//   });
// });



app.set('views', './views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(require("./routes/login-route.js"));
app.use(require("./routes/register.js"));
app.use(require("./routes/payment-route.js"));
app.use(require("./routes/artwork-route.js"));
app.use(require('./routes/logout-route.js'));
app.use(require('./routes/verification-route.js'));
app.use(require('./routes/lot-route.js'));
app.use(require('./routes/auction-route.js'));

app.get('/', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/auction');
  } else {
    res.redirect('/login');
  }
})

// app.get('/artwork', function(req, res) {
//   res.render('layouts/artwork');
// })

app.listen(port, ()=> {
  console.log(`Server listening on port`)
})
