const { encodeAddress } = require('@polkadot/keyring');

const zero = '0x' + '80f4e3bd716d3f2c32a77a3423a669d8d5864c3a6fb504c281a229d3e4d836cc';
const output = encodeAddress(zero, 43);

console.log(output.toString());
