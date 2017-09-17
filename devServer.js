"use strict"

let path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    webpack = require('webpack'),
    config = require('./webpack.config.dev');

let app = express(),
    compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());

app.post('/login', function (req, res) {
    let login = req.body.login,
        password = req.body.password;
    if(login === 'User' && password === 'Password'){
        res.send(JSON.stringify({auth: 'Logged', language: 'eng'}));
    }
    if(login === 'foo' && password === 'bar'){
        res.send(JSON.stringify({auth: 'Denied'}));
    }
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(7770, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7770');
});
