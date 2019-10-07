const fetch = require('node-fetch');
const Customers = require('../customers');

fetch('https://api.myjson.com/bins/1eyqeh')
  .then((response) => response.json())
  .then((customers) => {
    Customers.insertBulkCustomers(customers);
  });
