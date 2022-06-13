'use strict';
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');

const signinRouter=require('./routes/signin');
const signupRouter= require('./routes/signup');
const notFoundHandler=require('./error-handlers/404');
const errorHandler=require('./error-handlers/500');


const app = express();
app.use(express.json());

app.get("/",(req,res) => {
  res.send("Welcome to Home page");
})

app.use(signinRouter);
app.use(signupRouter);
app.use('*', notFoundHandler);
app.use(errorHandler);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Server is listening and Running on PORT ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start
};