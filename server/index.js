const express = require('express');
const APIToken = require('../config.js');
const bodyParser = require('body-parser');
const axios = require('axios');
let app = express();

// adding middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/', function (req, res) {
  // TODO - your code here!

});

app.get('/product', function (req, res) {
  let productId = req.query.productId;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}`,
    method: 'GET',
    headers: { Authorization: APIToken.TOKEN }
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/relatedItems', function (req, res) {
  let productId = req.query.productId;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/related`,
    method: 'GET',
    headers: { Authorization: APIToken.TOKEN }
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/getQA', (req, res) => {
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/qa/questions?product_id=13023',
    method: 'GET',
    headers: { Authorization: APIToken.TOKEN}
  })
    .then((res) => {
      console.log(res.data.results);
      res.send(res.data.results);
    })
    .catch((err) => {
      res.send(err);
      res.send(404);
    });
});

app.get('/getReview', (req, res) => {
app.post('/getReview', (req, res) => {
  var productId = Object.values(req.body)[0];
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/?product_id=${productId}`,
    method: 'GET',
    headers: { Authorization: APIToken.TOKEN }
  })
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((err) => {
      res.send(404);
    });
});

let PORT = process.env.PORT || 1128;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});