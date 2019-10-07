const Cloudant = require('@cloudant/cloudant');

const account = process.env.DB_ACCOUNT;
const password = process.env.DB_PASSWORD;

const cloudant = Cloudant({ account, password });

async function asyncCall() {
  await cloudant.db.create('alice');
  return cloudant.use('alice').insert({ happy: true }, 'rabbit');
}

asyncCall().then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
});
