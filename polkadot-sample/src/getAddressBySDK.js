const { encodeAddress, decodeAddress } = require('@polkadot/keyring');
const util = require('@polkadot/util-crypto');

const zero = '0x' + '8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48';
const output = encodeAddress(zero, 2);
console.log(output.toString());

const output2 = decodeAddress('HqGhgHg6YvnhaXSnaAUvyTDiR4FirB6Ssh2XNDedTzwCDv2', 2);
console.log(Buffer.from(output2).toString('hex'))


// console.log(util.encodeAddress(zero, 2).toString())
// console.log(Buffer.from(util.decodeAddress("FyMNEdUVc87aMeVLatctP1wSzk7DMU24KsV3vyLyGx6fnQq")).toString('hex'))
