
// Import
const { Keyring } = require('@polkadot/keyring');
const MNEMONIC = 'maze drum fatal beyond convince brand erode aisle word since art render';

// type: ed25519, ssFormat: 42 (all defaults)
const keyring = new Keyring({ type: "ecdsa" });
// const keyring = new Keyring();
const pair = keyring.createFromUri(MNEMONIC);

console.log(`- publicKey: ${Buffer.from(pair.publicKey).toString('hex')}`)

// use the default as setup on init
// 5CSbZ7wG456oty4WoiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ
console.log('Substrate generic', pair.address);

// adjust the default ss58Format for Kusama
// CxDDSH8gS7jecsxaRL9Txf8H5kqesLXAEAEgp76Yz632J9M
keyring.setSS58Format(2);
console.log('Kusama', pair.address);

// adjust the default ss58Format for Polkadot
// 1NthTCKurNHLW52mMa6iA8Gz7UFYW5UnM3yTSpVdGu4Th7h
keyring.setSS58Format(0);
console.log('Polkadot', pair.address);
