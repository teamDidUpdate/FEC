const express = require('express');
const APIToken = require('../config.js');
const axios = require('axios');
let app = express();

// adding middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

// fetch data from product overview
app.get('/overview', function (req, res) {
  let productId = req.query.productId;
  axios.all([
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}`, {headers: {
      Authorization: APIToken.TOKEN
    }}),
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/styles`, {headers: {
      Authorization: APIToken.TOKEN
    }})
  ])
    .then(axios.spread((detail, styles) => {
      var product = {
        overview: detail.data,
        styles: styles.data
      };
      var stringedProduct = JSON.stringify(product);
      res.status(200).send(stringedProduct);
    }))
    .catch((err) => {
      console.log('get overview error:' + err);
      res.send(404);
    });
});



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
        relatedIds: obj3.data,
        questionsAnswers: obj4.data,
        reviews: obj5.data,
        meta: obj6.data
      };
      var stringedProduct = JSON.stringify(product);
      res.status(200).send(stringedProduct);
    }))
    .catch((err) => {
      console.log('getall error:' + err);
      res.send(404);
    });
});

// Should this route be deleted?
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

/* -------- RELATED PRODUCT FETCHING -------- */
app.get('/relatedIds', function (req, res) {
  let productId = req.query.productId;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/related`,
    {headers: { Authorization: APIToken.TOKEN }})
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log('Error:', err);
      res.status(400).send('Error while fetching related Ids');
    });
});

app.get('/relatedProduct', function (req, res) {
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
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta/?product_id=${productId}`, {headers: {
      Authorization: APIToken.TOKEN
    }})
  ])
    .then(axios.spread((obj1, obj2, obj3, obj4) => {
      var product = {
        overview: obj1.data,
        styles: obj2.data,
        relatedIds: obj3.data,
        meta: obj4.data
      };
      res.status(200).json(product);
    }))
    .catch((err) => {
      console.log('getall error:' + err);
      res.send(404);
    });
});

let PORT = process.env.PORT || 1128;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});