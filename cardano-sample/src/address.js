const bech32 = require("bech32");
const address = 'addr1qdd9xypc9xnnstp2kas3r7mf7ylxn4sksfxxypvwgnc63vcayfawlf9hwv2fzuygt2km5v92kvf8e3s3mk7ynxw77cwqdquehe'
const decodeAddress = bech32.decode(address, 150);
const data5bit = decodeAddress.words;
const data = Buffer.from(data5bit, "hex");
console.log(data.toString("hex"));
const data8bit = bech32.fromWords(data5bit);
console.log(Buffer.from(data8bit, "hex").toString("hex"));
