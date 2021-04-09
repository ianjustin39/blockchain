const { encodeAddress, decodeAddress } = require('@polkadot/keyring');
const util = require('@polkadot/util-crypto');

const zero = '0x' + '02a5d39856caaf673b69f5d6a645f0a2352a051ad810194639bb4725f80f0f9064';
const output = encodeAddress(zero, 0);

console.log(output.toString());

const output2 = decodeAddress('15r2o8R7QPrUzR2qnE9hLdJQEFTVZZhzHN4YMYhq5v2JP5SE', 0);
console.log(Buffer.from(output2).toString('hex'))


console.log(util.encodeAddress(zero, 0).toString())
console.log(Buffer.from(util.decodeAddress("15r2o8R7QPrUzR2qnE9hLdJQEFTVZZhzHN4YMYhq5v2JP5SE")).toString('hex'))
