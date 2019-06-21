const express = require('express');
const helmet = require('helmet');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./api/config');
const db = require('./api/db');
const mongoose = require('mongoose');
const app = express();

app.use(helmet());

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  res.status(200).send(currentTime);
});

app.post('/login', function(req, res){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        username: req.body.username,
        password: hashedPassword
    },
    function(err, user) {
        if (err) {
            return res.status(500).send('There some thing err when register.');}
        else {
        var token= jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token});
        }
    });
});


module.exports = app;
