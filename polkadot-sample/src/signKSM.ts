import { stringToU8a, u8aToHex } from '@polkadot/util';
import { Keyring } from '@polkadot/api';

const keyring = new Keyring({ type: "ecdsa", ss58Format: 2 });

// create Alice based on the development seed
const alice = keyring.addFromUri('//Alice');

// create the message, actual signature and verify
const message = '9004000201e552298e47454041ea31273b4b630c64c104e4514aa3643490b8aaca9cf8ed04260700005023000005000000b0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe7389e97ef0d784ad47a843bd59274e58eaa661554cbc2ffee1f10feae903b330';

// const message = stringToU8a('this is our message');
console.log("message: ", Buffer.from(message).toString('hex'))
const signature = alice.sign(message);
console.log("signature: ", Buffer.from(signature).toString('hex'))
const isValid = alice.verify(message, signature, alice.addressRaw);


// output the result
console.log(`${u8aToHex(signature)} is ${isValid ? 'valid' : 'invalid'}`);
