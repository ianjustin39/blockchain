const { encodeAddress, decodeAddress } = require('@polkadot/keyring');
const util = require('@polkadot/util-crypto');

const zero = '0x' + '88d38dd7b7e450c426b33bd49db5efe92e702e0c799a5adab42be4fb21ed7566';
const output = encodeAddress(zero, 2);
console.log(output.toString());

const output2 = decodeAddress('HqGhgHg6YvnhaXSnaAUvyTDiR4FirB6Ssh2XNDedTzwCDv2', 2);
console.log(Buffer.from(output2).toString('hex'))


// console.log(util.encodeAddress(zero, 2).toString())
// console.log(Buffer.from(util.decodeAddress("FyMNEdUVc87aMeVLatctP1wSzk7DMU24KsV3vyLyGx6fnQq")).toString('hex'))
