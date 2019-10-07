const Cloudant = require('@cloudant/cloudant');

const account = process.env.DB_ACCOUNT;
const password = process.env.DB_PASSWORD;
const cloudant = Cloudant({ account, password });

const customersDB = cloudant.use('customers');

const insert = async (customerDoc) => customersDB.insert(customerDoc);
const get = async (customerID) => customersDB.get(customerID);
const update = async (updatedCustomerDoc) => customersDB.insert(updatedCustomerDoc);
const destroy = async (customerID, docRevision) => customersDB.destroy(customerID, docRevision);

get('customer_1').then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
});
