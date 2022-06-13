'use steict';
// 3rd party packages
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

// local modules
const { users } = require('../models/index');
const signInRouter = express.Router();
const basicAuth = require('../auth/basicAuth');

// routes
signInRouter.post('/signin', basicAuth, async (req, res) => {
  let basicHeaderParts = req.headers.authorization.split(" "); // ['Basic','QWxpOjIy'] 
  let encoded = basicHeaderParts[1];  
  // encoded=QWxpOjIy
  let decoded = base64.decode(encoded); 
  // decoded ="username:pasword"
  let username = decoded.split(":")[0]; 
  let password = decoded.split(":")[1];

  try {
    const user = await users.findOne({ where: {name: username } });
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      res.status(200).json({
        user
      });
    }else{
      res.status(500).send("wrong in login ")
    }
  } catch (e) { res.status(500).send("Invalid Login"); }
});

module.exports = signInRouter;