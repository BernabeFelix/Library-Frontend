const express = require('express'),
  http = require('http'),
  hostname = 'localhost',
  port = 3000;

app = express();

app.use(express.static(__dirname + '/src'));

app.listen(port, hostname, function() {
  console.log(`running server at http://${hostname}:${port}`);
});
