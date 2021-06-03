const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/', function (req, res) {
  // TODO - your code here!

});

app.get('/FILL_ME_IN', function (req, res) {
  // TODO - your code here!

});

let PORT = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});