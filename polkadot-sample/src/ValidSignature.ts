const { signatureVerify, blake2AsHex } = require('@polkadot/util-crypto');
const message = '0x0500006fe5efad718a8eb756b669a4de50273b864282719759a9ce01576096ed6b676fa10f250000001c0000000600000091b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c36636a38570a1ddc3111ec1a30ef3a5caad0fff0cf210783924d7b14bdcb0521a'
const sig = '0x02630ce5fde89c96851fce6de5c20206708ba37c64b1193cccd1dba4b5163f96be598257433e0983c0d4bca3a982853e3833de1bbba89968af4c2ed363629ab42800'
const pubkey = '13VAtLwNPFNMpqRJ6yzU4cwe3w4eyS9pDaLVW5DFzdvFwWa'
const result = signatureVerify(message, sig, Buffer.from(pubkey, 'hex'));
console.log('result :', result);
