const axios = require("axios");
const faker = require("faker");
const moment = require("moment");

const count = 10;

async function populate() {
  //add phone numbers
  let numsCreated = 0;
  while (numsCreated < phones) {
    const phone = {
      groupID: numsCreated + 1,
      phoneNumber: `${faker.phone.phoneNumber()}`,
      timesUsed: "0"
    };

    try {
      await axios.post(`http://localhost:9000/numbers`, phone);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }

    numsCreated++;
  }

  let created = 0;
  let groupID = 1;
  let i = 0;
  while (created < count) {
    try {
      var req = await axios.get(`http://localhost:9000/numbers/next`);
      if (req.data == "") {
        console.log(
          "Ran out of phone numbers, " + (count - created) + " users left over"
        );
        process.exit(0);
        break;
      } else {
        console.log("got number ");
        console.log(req.data);
        var number = req.data;
        groupID = number.groupID;
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
      break;
    }

    const user = {
      firstName: `${faker.name.firstName()}`,
      lastName: `${faker.name.lastName()}`,
      username: `${faker.internet.userName()}`,
      phoneNumber: `${faker.phone.phoneNumberFormat(1)}`,
      groupID: groupID
    };

    try {
      await axios.post(`http://localhost:80/users`, user);
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
