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

/*  connecting heroku db in node.js:
    install the pg npm module as a dependency then
    connect to process.env.DATABASE_URL when your app initializes */

const { Client } = require('pg');
const db_url = 'postgresql-round-61794';

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



app.use(require("./routes/login-route.js"));
app.use(require("./routes/register.js"))

app.get('/', (req, res, next) => {
  res.send("site under construction");
})




app.listen(port, ()=> {
  console.log(`Server listening on port`)
})
