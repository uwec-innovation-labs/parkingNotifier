const axios = require("axios");


async function test() {

  const user = {
    firstName: `test`,
    lastName: `test`,
    username: `test2`,
    phoneNumber: `test`
  };

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

