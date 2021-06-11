const express = require('express');
const APIToken = require('../config.js');
const axios = require('axios');
let app = express();

// adding middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

/* -------- PRODUCT OVERVIEW FETCHING -------- */
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

/* -------- ADD TO CART POST REQUEST -------- */
app.post('/addToCart', (req, res) => {
  const skuId = Number(req.body.skuId);
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/cart', {"sku_id" : skuId}, {headers: { Authorization: APIToken.TOKEN}})
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

/* -------- QUESTION & ANSWER -------- */
app.get('/qa/questions', (req, res) => {
  let productId = req.query.productId;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/qa/questions?product_id=${productId}`, {headers: { Authorization: APIToken.TOKEN }})
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(400).send('Error while fetching Q&A'));
});

app.put('/question/helpful', (req, res) => {
  let questionId = req.body.questionId;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/qa/questions/${questionId}/helpful`, {headers: { Authorization: APIToken.TOKEN }})
    .then(response => res.status(204))
    .catch(err => res.status(400).send('Error updating helpful status'));
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

/************METADATA ************/
/*
Need to do two things
1. import StarsRating from 'stars-rating';
2. <div className='StarsRating'><StarsRating count={5} value={YOUR VALUE HERE!!!!} half={true} edit={false} color2={'#333300'} /></div>
*/

//Helper for Below
var calculateAverage = function (object) {
  var sum = 0;
  var quant = 0;
  for (var key in object) {
    sum = sum + (Number(key) * Number(object[key]));
    quant += Number(object[key]);
  }
  var number = sum / quant;
  return Number((Math.round(number * 4) / 4).toFixed(2));
};

//Pass through some productId and you will get returned an average rating for it rounded to the nearest 0.25
app.get('/getAverageRating', function (req, res) {
  let productId = req.query.productId;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta/?product_id=${productId}`,
    {headers: { Authorization: APIToken.TOKEN }})
    .then((response) => {
      res.send(JSON.stringify(calculateAverage(response.data.ratings)));
    })
    .catch((err) => {
      res.send(404);
    });
});

app.get('/getNumberOfReviews', function (req, res) {
  let productId = req.query.productId;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/?product_id=${productId}&count=50`,
    {headers: { Authorization: APIToken.TOKEN }})
    .then((response) => {
      res.send(JSON.stringify(response.data.results.length));
    })
    .catch((err) => {
      res.send(404);
    });
});

let PORT = process.env.PORT || 1128;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});