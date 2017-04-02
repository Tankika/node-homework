// import express from 'express';
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8080;

const app = express();

app.set('view engine', 'ejs')

app.use('/', express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.tpl = {};
  res.tpl.error = [];

  return next();
});

app.use((err, req, res, next) => {
  res.status(500).send('Váraltna hiba történt!');

  console.error(err.stack);
});

require('./routes/card.js')(app);
require('./routes/deck.js')(app);
require('./routes/outside.js')(app);

const server = app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});
