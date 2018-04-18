const express = require('express');
const app = express();

const session = require('express-session');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const handlebars = require("handlebars");

const exphbs = require('express-handlebars');

// socket.io requires
const path = require('path');
const http = require('http');
const server = http.createServer(app);
// const io = require('socket.io').listen(server);
// server.listen(8000);
// end socket.io requires

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "cats",
                  resave: true,
                  saveUninitialized: false,
                  cookie: {
                    expires: false, //closing the browser will not log the user out
                    maxAge: 1 * 24 * 60 * 60 * 1000 //one day
                  }
 }));

/*  connecting heroku db in node.js:
    install the pg npm module as a dependency then
    connect to process.env.DATABASE_URL when your app initializes */

    const { Client } = require('pg');
    const db_url = 'postgres://qgauodbyzimumj:4071b5334860231f7881bb907f5fbc9e9fad3e60b9c759cd8bdac0214daf670d@ec2-54-83-204-6.compute-1.amazonaws.com:5432/d5df5c8pc330kr';

    const client = new Client({
      connectionString: process.env.db_url,
      ssl: true,
    });

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
/* end db connection */


// // socket.io server listening and broadcasting for app.js
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
// app.use(require("./routes/register.js"));
// app.use(require("./routes/payment-route.js"));
app.use(require("./routes/artwork-route.js"));

app.get('/', (req, res, next) => {
  res.send("site under construction");
})

app.get('/artwork', function(req, res) {
  res.render('layouts/artwork');
})

app.listen(port, ()=> {
  console.log(`Server listening on port`)
})
