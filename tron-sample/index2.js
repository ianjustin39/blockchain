
const sm3 = require('sm3');
const elliptic = require('elliptic');
const ec = new elliptic.ec('secp256k1');

const crypto = require('crypto');
const tron = require("./utils/tron_utils");
const wallet = require("./utils/wallet_utils");
const trc10 = require("./utils/trc10");
const { byteArray2hexStr } = require("./lib/crypto_utils");

function SHA256(data) {
  const sha256 = crypto.createHash('sha256');
  return sha256.update(Buffer.from(data, 'hex')).digest();
}

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
  - addressBytes: ${addressBytes} 
  - base58: ${wallet.getBase58CheckAddress(addressBytes)}
  - hex: ${byteArray2hexStr(addressBytes)}`);

  console.log("\n============== Use Tron Web ==============\n");

  // get the object of test net
  const network = tron.getNetwork(tron.net.TEST_NET);

  // create an instance of tron web
  const tronWeb = tron.createTronWebInstance(priKeyHex, network)

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

  const transaction2 = await tronWeb.transactionBuilder.freezeBalance(
    amount,
    3,
    'ENERGY',
    from,
    to
  );
  
  console.log(`raw transaction2
  - txID: ${transaction2.txID}
  - rawData: ${JSON.stringify(transaction2.raw_data)}
  - rawDataHex: ${transaction2.raw_data_hex}
  `);

  const transaction = await tronWeb.transactionBuilder.sendTrx(
    to,
    amount,
    from
  );
  console.log("obj", JSON.stringify(transaction));
  console.log(`raw transaction
  - txID: ${transaction.txID}
  - rawData: ${JSON.stringify(transaction.raw_data)}
  - rawDataHex: ${transaction.raw_data_hex}
  `);

  // sign raw transaction
  // const signedTx = await tronWeb.trx.sign(transaction, priKeyHex);
  // console.log(`signed tx
  // - obj: ${JSON.stringify(signedTx)}
  // - txID: ${signedTx.txID}
  // - rawDataHex: ${signedTx.raw_data_hex}
  // - signature: ${signedTx.signature}
  // `);
  
  console.log('-----')
  const sm3 = require('sm3');
  console.log(JSON.stringify(transaction.raw_data))
  // let hashBytes = SHA256(Buffer.from(JSON.stringify(transaction.raw_data)));
  const hashBytes = sm3(JSON.stringify(transaction.raw_data))
  console.log(hashBytes)
  console.log('-----')



  const txID = transaction.txID;
  const signature = ECKeySign(hexStr2byteArray(txID), priKeyBytes);
  console.log(hexStr2byteArray(txID))
  transaction.signature = [signature]
  console.log(transaction)
  
  // broadcast a signed raw transaction
  // const sendResult = await tronWeb.trx.sendRawTransaction(transaction);
  // console.log(`send result
  // - obj: ${JSON.stringify(sendResult)}
  // - result: ${sendResult.result}
  // - txID: ${sendResult.transaction.txID}
  // `);
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


function ECKeySign(hashBytes, priKeyBytes) {
  const elliptic = require('elliptic');
  const ec = new elliptic.ec('secp256k1');
  let key = ec.keyFromPrivate(priKeyBytes, 'bytes');
  let signature = key.sign(hashBytes);
  let r = signature.r;
  let s = signature.s;
  let id = signature.recoveryParam;

  let rHex = r.toString('hex');
  while (rHex.length < 64) {
    rHex = "0" + rHex;
  }
  let sHex = s.toString('hex');
  while (sHex.length < 64) {
    sHex = "0" + sHex;
  }
  let idHex = byte2hexStr(id);
  let signHex = rHex + sHex + idHex;
  return signHex;
}

function hexChar2byte(c) {
  var d = 0;
  if (c >= 'A' && c <= 'F') {
    d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }
  else if (c >= 'a' && c <= 'f') {
    d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
  }
  else if (c >= '0' && c <= '9') {
    d = c.charCodeAt(0) - '0'.charCodeAt(0);
  }
  return d;
}

function hexChar2byte(c) {
  var d = 0;
  if (c >= 'A' && c <= 'F') {
    d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }
  else if (c >= 'a' && c <= 'f') {
    d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
  }
  else if (c >= '0' && c <= '9') {
    d = c.charCodeAt(0) - '0'.charCodeAt(0);
  }
  return d;
}


function isHexChar(c) {
  if ((c >= 'A' && c <= 'F') ||
    (c >= 'a' && c <= 'f') ||
    (c >= '0' && c <= '9')) {
    return 1;
  }
  return 0;
}

function hexStr2byteArray(str) {
  var byteArray = Array();
  var d = 0;
  var j = 0;
  var k = 0;

  for (let i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;
      if (0 === (j % 2)) {
        byteArray[k++] = d;
        d = 0;
      }
    }
  }
  return byteArray;
}


function byte2hexStr(byte) {
  var hexByteMap = "0123456789ABCDEF";
  var str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}

// function byteArray2hexStr(byteArray) {
//   var str = "";
//   for (var i = 0; i < (byteArray.length - 1); i++) {
//     str += byte2hexStr(byteArray[i]);
//   }
//   str += byte2hexStr(byteArray[i]);
//   return str;
// }
