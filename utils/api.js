const axios = require('axios');
const config = require('../config.js');

let getStuff = (/* TODO */) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  let options = {
    url: 'FILL ME IN',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

};

module.exports.getStuff = getStuff;