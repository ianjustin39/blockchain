const bech32 = require("bech32");
const address = 'addr1qxn5anyxv6dhtl57yvgvpp25emy0pc9wenqzzemxktyr94ahaaap0f0tn4wxaqsydnzty2m0y4gfeu39ckjvsjycs4nssxhc25'
const decodeAddress = bech32.decode(address, 150);
const data5bit = decodeAddress.words;
const data = Buffer.from(data5bit, "hex");
console.log("data5bit: ", data.toString("hex"));
const data8bit = bech32.fromWords(data5bit);
console.log("data8bit: ", Buffer.from(data8bit, "hex").toString("hex"));


