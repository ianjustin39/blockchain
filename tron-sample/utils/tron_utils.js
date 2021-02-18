// tron web
// https://developers.tron.network/docs/tron-web-intro
const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider;

const net = {
  MAIN_NET: "MAIN_NET",
  TEST_NET: "TEST_NET",
};

function getNetwork(option) {
  switch (option) {
    case net.MAIN_NET:
      return {
        fullNode: new HttpProvider("https://api.trongrid.io"),
        solidityNode: new HttpProvider("https://api.trongrid.io"),
        eventServer: new HttpProvider("https://api.trongrid.io"),
      };

    case net.TEST_NET:
      return {
        fullNode: new HttpProvider("https://api.shasta.trongrid.io"),
        solidityNode: new HttpProvider("https://api.shasta.trongrid.io"),
        eventServer: new HttpProvider("https://api.shasta.trongrid.io"),
      };
  }
}

/**
 * Generate the account offline
 * @returns {Object} account
 * @returns {string} account.privateKey
 * @returns {string} account.publicKey
 * @returns {Object} address
 * @returns {string} address.base58
 * @returns {string} address.hex
 */
exports.generateAccount = () => TronWeb.utils.accounts.generateAccount();

/**
 * Create the instance of Tron Web
 * @param {string} privateKey
 */
function createTronWebInstance(privateKey, network) {
  const { fullNode, solidityNode, eventServer } = network;
  return new TronWeb(fullNode, solidityNode, eventServer, privateKey);
}

module.exports = {
  net,
  getNetwork,
  createTronWebInstance,
};
