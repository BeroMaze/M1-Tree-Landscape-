"use strict"
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var PORT = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./'));
app.use(bodyParser());

app.get('*', function(request, response) {
  console.log('New request:', request.url);
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
  console.log(req.body.info);
  var form = req.body.info;
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "m1servermail@gmail.com",
          pass: "treeandlandscape"
      }
  });
  //Mail options
  mailOpts = {
      from: form.firstName + ' ' +  form.lastName + '; '+ form.email + '', //grab form data from the request body object
      to: 'berning.corey@gmail.com',
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
          message: 'Your message has been sent.<br> Thank you for contacting M1, we will be in contact soon.',
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
