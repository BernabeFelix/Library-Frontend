const express = require('express'),
  port = process.env.PORT || 9000,
  staticDest = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

const app = express();

app.use(express.static(`${__dirname}/${staticDest}`));

app.listen(port, function() {
  console.log(`running server on port: ${port}`);
});
