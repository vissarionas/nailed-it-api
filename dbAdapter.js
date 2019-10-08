require('dotenv').config();

const Cloudant = require('@cloudant/cloudant');

const account = process.env.DB_ACCOUNT;
const password = process.env.DB_PASSWORD;
const cloudant = Cloudant({ account, password });

class DbAdapter {
  constructor(dbName) {
    this.db = cloudant.use(dbName);
  }

  insert(doc) {
    return this.db.insert(doc);
  }

  update(updatedDoc) {
    return this.db.insert(updatedDoc);
  }

  bulkInsert(docs) {
    return this.db.bulk({ docs });
  }

  get(docId) {
    return this.db.get(docId);
  }

  getAll() {
    return this.db.list({ include_docs: true });
  }

  destroy(docId, docRev) {
    return this.db.destroy(docId, docRev);
  }
}


module.exports = DbAdapter;
