const bip39 = require("bip39");
const bip32 = require("bip32");
const ss58 = require("./utils/ss58");

const mnemonic = "brick advance lesson funny refuse trumpet thunder food enrich couple polar become marine neither swallow"


const seedHex = bip39.mnemonicToEntropy(mnemonic);
// const seedHex = '554b6fc625fbea8f56eb56262d92ccb083fd6eaaf5ee9a966eaab4db2062f4d0';

const node = bip32.fromSeed(Buffer.from(seedHex))
const child = node.derivePath("m/44'/0'/0'/0/0");
console.log("- private key: " + child.privateKey.toString('hex'))
console.log("- public key: " + child.publicKey.toString('hex'))
console.log('')

// console.log(ss58.ss58_encode(Buffer.from("2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235", 'hex')))
// // console.log(ss58.ss58_encode(child.publicKey.toString('hex')))
// console.log('')
// // console.log(ss58.ss58_decode("5EynjWoAGg4sEF9b2FLQobKvSFF5EEhgr5SgJS6GftC3reWD").toString('hex'))
// console.log(ss58.ss58_decode("121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2").toString('hex'))
