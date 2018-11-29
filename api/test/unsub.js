const axios = require("axios");

const user = {
    firstName: `test`,
    lastName: `test`,
    username: `test`,
    phoneNumber: `test`,
    groupID: 0
  };

  try {
    axios.post(`http://localhost:9000/users`, user);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

console.log("User added");

