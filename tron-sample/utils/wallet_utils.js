const bip39 = require("bip39");
const bip32 = require("bip32");
const EC = require("elliptic").ec;
const { keccak256 } = require("js-sha3");
const jsSHA = require("../lib/sha256");
const { encode58, decode58 } = require("../lib/base58");
const { hexStr2byteArray, byteArray2hexStr } = require("../lib/crypto_utils");


const ADDRESS_PREFIX = "41";
const ADDRESS_PREFIX_BYTE = 0x41;

/**
 * Get the private key from mnemonic
 * @param {string} mnemonic the words are separated by spaces
 */
const getPriKeyFromMnemonic = (mnemonic) => {
  const node = bip32.fromSeed(bip39.mnemonicToSeedSync(mnemonic));
  const child = node.derivePath("m/44'/195'/0'/0/0"); // https://github.com/satoshilabs/slips/blob/master/slip-0044.md

  let priKeyHex = child.privateKey.toString("hex");

  while (priKeyHex.length < 64) {
    priKeyHex = `0${priKeyHex}`;
  }
  return hexStr2byteArray(priKeyHex);
};

/**
 * Get address in byte array from public key
 * @param {byte[]} pubBytes public key in byte array
 */
function computeAddress(pubBytes) {
  if (pubBytes.length === 65) {
    pubBytes = pubBytes.slice(1);
  }

  var hash = keccak256(pubBytes).toString();
  var addressHex = hash.substring(24);
  console.log("addressHex: " + addressHex)
  addressHex = ADDRESS_PREFIX + addressHex;
  return hexStr2byteArray(addressHex);
}

function getAddressFromPriKey(priKeyBytes) {
  let pubBytes = getPubKeyFromPriKey(priKeyBytes);
  // console.log("address: ", byteArray2hexStr(computeAddress(pubBytes)));
  return computeAddress(pubBytes);
}

//return pubkey by 65 bytes, priKeyBytes is byte[]
function getPubKeyFromPriKey(priKeyBytes) {
  var ec = new EC("secp256k1");
  var key = ec.keyFromPrivate(priKeyBytes, "bytes");
  var pubkey = key.getPublic();
  var x = pubkey.x;
  var y = pubkey.y;
  var xHex = x.toString("hex");
  while (xHex.length < 64) {
    xHex = "0" + xHex;
  }
  var yHex = y.toString("hex");
  while (yHex.length < 64) {
    yHex = "0" + yHex;
  }
  var pubkeyHex = `04${xHex}${yHex}`;
  console.log("pubkeyHex: " + pubkeyHex)
  var pubkeyBytes = hexStr2byteArray(pubkeyHex);
  return pubkeyBytes;
}

//return address by Base58Check String,
function getBase58CheckAddress(addressBytes) {
  var hash0 = SHA256(addressBytes);
  var hash1 = SHA256(hash0);
  var checkSum = hash1.slice(0, 4);
  console.log("hash1: " + hash1)
  checkSum = addressBytes.concat(checkSum);
  console.log("checkSum: " + checkSum)
  return encode58(checkSum);
}

//return 32 bytes
function SHA256(msgBytes) {
  let shaObj = new jsSHA("SHA-256", "HEX");
  let msgHex = byteArray2hexStr(msgBytes);
  shaObj.update(msgHex);
  let hashHex = shaObj.getHash("HEX");
  console.log("hashHex: " + hashHex)
  return hexStr2byteArray(hashHex);
}

module.exports = {
  getPriKeyFromMnemonic,
  getPubKeyFromPriKey,
  getAddressFromPriKey,
  getBase58CheckAddress,
};
