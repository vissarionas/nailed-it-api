const DbAdapter = require('./dbAdapter');

const customersDb = new DbAdapter('customers');

class Customers {
  static insertBulkCustomers(customerDocs) {
    return customersDb.bulkInsert(customerDocs);
  }
}

module.exports = Customers;
