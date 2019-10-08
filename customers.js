const DbAdapter = require('./dbAdapter');

const customersDb = new DbAdapter('customers');

class Customers {
  static insertBulkCustomers(customerDocs) {
    return customersDb.bulkInsert(customerDocs);
  }

  static getCustomers() {
    return customersDb.getAll();
  }

  static saveCustomer(customerDoc) {
    return customersDb.insert(customerDoc);
  }

  static updateCustomer(updatedCustomerDoc) {
    return customersDb.update(updatedCustomerDoc);
  }

  static deleteCustomer(customerID, revision) {
    return customersDb.destroy(customerID, revision);
  }
}

module.exports = Customers;
