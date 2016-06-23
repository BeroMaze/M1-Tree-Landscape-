"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var PORT = process.env.PORT;
var emailPassword = process.env.PASSWORD;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./'));
app.use(bodyParser());


app.get('*', function(request, response) {
  // console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.get('/contactus/', function(req, res) {
  res.sendFile('index.html', {root:__dirname + '/'});
});
app.get('/aboutus/', function(req, res) {
  res.sendFile('index.html', {root:__dirname + '/'});
});
app.get('/ordinances/', function(req, res) {
  res.sendFile('index.html', {root:__dirname + '/'});
});

app.post('/contact', function (req, res) {
  // console.log(req.body.info);
  var form = req.body.info;
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "m1servermail@gmail.com",
          pass: emailPassword
      }
  });
  //Mail options
  mailOpts = {
      from: form.firstName + ' ' +  form.lastName + '; '+ form.email + '', //grab form data from the request body object
      to: 'tannerm1tree@outlook.com', //tannerm1tree@outlook.com
      subject: 'M1 Contact Form',
      html:form.message + '<br><br>' + form.firstName + ' ' +  form.lastName + '<br>' + form.number  + '<br>' + form.email
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
        console.log(error);
        var data = {
          message: 'Sorry there was an issue.<br> Please try submitting your message again. Thank you.',
          flag: false
        };
        res.send(data);
      }
      //Yay!! Email sent
      else {
        var data = {
          message: 'Your message has been sent.<br> Thank you for contacting M1 Tree & Landscape LLC. We will be in contact shortly.',
          flag: true
        };
        console.log('sent');
        res.send(data);
      }
  });
});

app.post('/quote', function (req, res) {
  // console.log(req.body);
  var form = req.body.info;
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "m1servermail@gmail.com",
          pass: emailPassword
      }
  });

  //  + '<img src="'+ form.pic+'">'

  //Mail options
  mailOpts = {
      from: form.firstName + ' ' +  form.lastName + '; '+ form.email + '', //grab form data from the request body object
      to: 'tannerm1tree@outlook.com',//tannerm1tree@outlook.com
      subject: 'M1 Quote Form',
      html: form.message + '<br><br>Needed: ' + form.needed + '<br><br>' + form.firstName + ' ' +  form.lastName + '<br>' + form.number  + '<br>' + form.email + '<br>' + form.streetAdress + '<br>' + form.cityState +' '+ form.zipCode + '<br> <img src="'+ form.pic +'">'
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
        console.log(error);
        var data = {
          message: 'Sorry there was an issue.<br> Please try submitting your message again. Thank you.',
          flag: false
        };
        res.send(data);
      }
      //Yay!! Email sent
      else {
        var data = {
          message: 'Thank you For your interest in M1 Tree & Landscape.<br> We have received your Quote and will be in contact shortly.',
          flag: true
        };
        console.log('sent');
        res.send(data);
      }
  });
});


  app.listen(PORT, function() {
    console.log('server started');
    console.log('listening on PORT: ', + PORT);
  });
