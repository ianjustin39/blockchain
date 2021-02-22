import { Keyring } from '@polkadot/api';

const keyring = new Keyring({ type: "ecdsa", ss58Format: 0 });
const mnemonic = "brick advance lesson funny refuse trumpet thunder food enrich couple polar become marine neither swallow"
console.log("- mnemonic: ", mnemonic);
// create & add the pair to the keyring with the type and some additional
// metadata specified
const pair = keyring.addFromUri(mnemonic, {}, "ecdsa");

var publicKey = new Uint8Array(pair.publicKey);
console.log(`- publicKey: ${Buffer.from(publicKey).toString('hex')}`)
console.log(`- address: ${pair.address}`)
