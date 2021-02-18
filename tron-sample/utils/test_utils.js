const tron = require("./utils/tron_utils");

// generate account offline
const account = tron.generateAccount();
console.log("account: ", account);
