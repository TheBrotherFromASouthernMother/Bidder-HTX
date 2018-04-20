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
const io = require('socket.io').listen(server);
server.listen(8000);
// end socket.io requires

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "cats",
                  resave: true,
                  saveUninitialized: false,
                  cookie: {
                    expires: true, //closing the browser will not log the user out
                    maxAge: 1 * 24 * 60 * 60 * 1000 //one day
                  }
 }));

// socket.io server
var clients = 0;
var bidData;
// when some client connects:
io.on('connection', function(socket) {
  clients++; // client counter decreases
  console.log('A client has connected. ' + clients + ' now connected.');

  // listen to incoming bids
  var incomingBid = socket.on('bid', function(bidEvent) {
    console.log('Incoming bid: ' + bidEvent.bidAmount + ' from ' + bidEvent.userId + ' for lot ' + bidEvent.lotNumber); // submitted bid is transmitted back to server; use content to parse for bidValue, email, lotId to update db (pass to another route js???)
    var bidData = bidEvent;
    console.log('updating bids TABLE with: ' + bidData);

    // SQL statement to update bid TABLE
    db.one('INSERT INTO bids VALUES (DEFAULT, $1, NOW(), FALSE, $2, $3) RETURNING *', [bidEvent.bidAmount, bidEvent.userId, bidEvent.lotNumber])
      .then(bidData => {
        console.log('bids TABLE was updated successfully as id#', bidData.id); // confirm bid data updated to db
      })
      .catch(error => {
        console.log('bids TABLE was not updated successfully! ', error);
      });

  //when some client disconnects:
    socket.on('disconnect', function() {
      clients--; // client counter decreases
      console.log('A client has disconnected. ' + clients + ' still connected.');
    });
  });
});
// var sendBidDataToServer = socketServer;
// console.log(sendBidDataToServer);
// console.log('bid data to send: ' + bidData);
// module.exports.sendBidDataToServer = sendBidDataToServer;

app.set('views', './views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(require("./routes/login-route.js"));
app.use(require("./routes/register-route.js"));
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
});
app.listen(port, ()=> {
  console.log(`Server listening on port`)
});
