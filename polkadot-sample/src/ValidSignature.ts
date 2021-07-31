const { signatureVerify, blake2AsHex } = require('@polkadot/util-crypto');
const message = '0x9004000201e552298e47454041ea31273b4b630c64c104e4514aa3643490b8aaca9cf8ed04260700005023000005000000b0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe7389e97ef0d784ad47a843bd59274e58eaa661554cbc2ffee1f10feae903b330'
const sig = '0x029f2bd839d881547d5573a0f5046695c3802382fdd90fad2e7e469c2cecac4d08ca2dc9c98ad232b7435a28e5d41b0b0ccf1bd7169373c9f94a1fec49e8649dc301'
const pubkey = 'CcogsRk8xzpfweM7Ak3Ds9nw2DemLhCC6gbisMpBhptpgcr'
const result = signatureVerify(message, sig, Buffer.from(pubkey, 'hex'));
console.log('result :', result);
