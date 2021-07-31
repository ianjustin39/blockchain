const tron = require("./utils/tron_utils");
const wallet = require("./utils/wallet_utils");
// const trc10 = require("./utils/trc10");
const { byteArray2hexStr } = require("./lib/crypto_utils");

const mnemonic =
  "crash shock glue release essence moon marriage unusual hill task rabbit sister";

const App = async () => {
  // get private key from mnemonic
  const priKeyBytes = wallet.getPriKeyFromMnemonic(mnemonic);
  const priKeyHex = byteArray2hexStr(priKeyBytes);
  console.log(`priKey
  - length: ${priKeyBytes.length} bytes
  - hex:  ${priKeyHex}`);

  // get public key from private key
  const pubKeyBytes = wallet.getPubKeyFromPriKey(priKeyBytes);
  console.log(`pubKey
  - length: ${pubKeyBytes.length} bytes
  - hex:  ${byteArray2hexStr(pubKeyBytes)}`);

  // derive address from private key
  const addressBytes = wallet.getAddressFromPriKey(priKeyBytes);
  console.log(`address
  - length: ${addressBytes.length} bytes
  - base58: ${wallet.getBase58CheckAddress(addressBytes)}
  - hex: ${byteArray2hexStr(addressBytes)}`);

  console.log("\n============== Use Tron Web ==============\n");

  // get the object of test net
  // const network = tron.getNetwork(tron.net.MAIN_NET);
  const network = tron.getNetwork(tron.net.TEST_NET);

  // create an instance of tron web
  const tronWeb = tron.createTronWebInstance(priKeyHex, network);

  // derive address from private key with tron web
  const derivedAddress = tronWeb.address.fromPrivateKey(priKeyHex);
  console.log(`address
  - base58: ${derivedAddress}
  - hex: ${tronWeb.address.toHex(derivedAddress)}`);

  // get balance
  let balance = await tronWeb.trx.getBalance(byteArray2hexStr(addressBytes));
  console.log(`balance
  - ${balance} SUN
  - ${tronWeb.fromSun(balance)} TRX`);

  // get bandwidth
  let bandwidth = await tronWeb.trx.getBandwidth(
    byteArray2hexStr(addressBytes)
  );
  console.log(`bandwidth
    - ${bandwidth} points`);

  // build raw transaction
  const from = "TPYs3996Lz5ZTN8uVP5Uo6zaYqeL47Katn";
  const to = "TSs4E66bBN9otqHxYtBX51gyKTzC4S9vM5";
  const amount = tronWeb.toSun(1);
  const transaction = await tronWeb.transactionBuilder.sendTrx(
    to,
    amount,
    from
  );
  console.log("obj", JSON.stringify(transaction));
  console.log(`raw transaction
  - txID: ${transaction.txID}
  - amount: ${amount}
  - rawData: ${JSON.stringify(transaction.raw_data)}
  - rawDataHex: ${transaction.raw_data_hex}
  `);

  // sign raw transaction
  const signedTx = await tronWeb.trx.sign(transaction, priKeyHex);
  console.log(`signed tx
  - obj: ${JSON.stringify(signedTx)}
  - txID: ${signedTx.txID}
  - rawDataHex: ${signedTx.raw_data_hex}
  - signature: ${signedTx.signature}
  `);

  // broadcast a signed raw transaction
  const sendResult = await tronWeb.trx.sendRawTransaction(signedTx);
  console.log(`send result
  - obj: ${JSON.stringify(sendResult)}
  - result: ${sendResult.result}
  - txID: ${sendResult.transaction.txID}
  `);
};

/**
 * get the balance of the provided address
 * @param {Object} tronWeb the tron web instance
 * @param {string} addressHexStr address in hex string
 */
const getBalance = async (tronWeb, addressHexStr) =>
  tronWeb.trx.getBalance(addressHexStr);

/**
 *  set timeout
 * @param {number} ms time in millisecond
 */
const timeOut = (ms) => {
  return new Promise((fulfill) => {
    setTimeout(fulfill, ms);
  });
};

App();
