const bech32 = require("bech32");

const www = bech32.decode('abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw')
// => {
// 	 prefix: 'abcdef',
// 	 words: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
// }
console.log(www)
const data5bit = www.words;
const data = Buffer.from(data5bit, "hex");
console.log("data5bit: ", data.toString("hex"));
const data8bit = bech32.fromWords(data5bit);
console.log("data8bit: ", Buffer.from(data8bit, "hex").toString("hex"));


