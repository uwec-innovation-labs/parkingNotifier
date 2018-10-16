const axios = require("axios");
const faker = require("faker");
const moment = require("moment");

const count = 1000;

async function populate() {
  let created = 0;
  while (created < count) {
    const user = {
      firstName: `${faker.name.firstName()}`,
      lastName: `${faker.name.lastName()}`,
      username: `${faker.internet.userName()}`,
      phoneNumber: `${faker.phone.phoneNumberFormat(1)}`
    };

    try {
      await axios.post(`http://localhost:9000/users`, user);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }

    created++;
  }

  return true;
}

console.log("Starting 🚀");
const start = moment();
populate()
  .then(() => {
    const end = moment();
    console.log(`All done in ${end.diff(start) / 1000} s 😸`);
  })
  .catch(err => {
    console.error(err);
    console.error("Failed 😭");
  });
