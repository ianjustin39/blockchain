import { Keyring } from '@polkadot/api';
const { encodeAddress, decodeAddress } = require('@polkadot/keyring');

const keyring = new Keyring({ type: "ecdsa", ss58Format: 0 });
const mnemonic = "holiday emotion cook vehicle kite spike kingdom you appear stadium exile end"
console.log("- mnemonic: ", mnemonic);
// create & add the pair to the keyring with the type and some additional
// metadata specified
const pair = keyring.addFromUri(mnemonic, {}, "ecdsa");

var publicKey = new Uint8Array(pair.publicKey);
console.log(`- publicKey: ${Buffer.from(publicKey).toString('hex')}`)
console.log(`- publicKey: ${publicKey}`)
console.log(`- address: ${pair.address}`)

