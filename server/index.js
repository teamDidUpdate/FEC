const express = require('express');
const APIToken = require('../config.js');
const bodyParser = require('body-parser');
const axios = require('axios');
let app = express();

// adding middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

// fetch all the data from API
app.get('/getProduct', function (req, res) {
  let productId = req.query.productId;
  axios.all([
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}`, {headers: {
      Authorization: APIToken.TOKEN
    }}),
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/styles`, {headers: {
      Authorization: APIToken.TOKEN
    }}),
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/related`, {headers: {
      Authorization: APIToken.TOKEN
    }}),
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/qa/questions?product_id=${productId}`, {headers: {
      Authorization: APIToken.TOKEN
    }}),
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/?product_id=${productId}`, {headers: {
      Authorization: APIToken.TOKEN
    }}),
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta/?product_id=${productId}`, {headers: {
      Authorization: APIToken.TOKEN
    }})
  ])
    .then(axios.spread((obj1, obj2, obj3, obj4, obj5, obj6) => {
      var product = {
        overview: obj1.data,
        styles: obj2.data,
        relatedProducts: obj3.data,
        questionsAnswers: obj4.data,
        reviews: obj5.data,
        meta: obj6.data
      };
      var stringedProduct = JSON.stringify(product);
      res.send(stringedProduct);
    }))
    .catch((err) => {
      console.log('getall error:' + err);
      res.send(404);
    });
});

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