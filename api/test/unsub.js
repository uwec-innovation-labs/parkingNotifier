const axios = require("axios");


async function test() {

const number = {
    phoneNumber: '123456789',
    groupID: '0',
    timesUsed: '0'
};

try {
    await axios.post(`http://localhost:9000/numbers`, number);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Number added");

const user = {
    firstName: `test`,
    lastName: `test`,
    username: `test2`,
    phoneNumber: `test`,
    groupID: '0'
  };

  try {
    await axios.post(`http://localhost:9000/users`, user);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

console.log("User added");

try {
    await axios.post(`http://localhost:9000/users/unsubscribe`, user);
  } catch (err) {
    console.error(err);
    console.log("ewwow");
    process.exit(1);
  }

console.log("User deleted");


try {
    //await axios.post(`http://localhost:9000/numbers/unsubscribe`, user);
} catch (err) {
    console.error(err);
    console.log("ewwow");
    process.exit(1);
  }
console.log("Number deleted");
}
test();
