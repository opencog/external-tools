var express = require('express');
var app = express();

app.use(express.static('/'));

app.listen(8000, function () {
  console.log('Glimpse listening on port 8000!');
});