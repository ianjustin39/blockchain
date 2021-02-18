const crypto = require('crypto')
const secp256k1 = require('secp256k1')

const sha512 = (key, data) => crypto
  .createHmac('sha512', key)
  .update(data)
  .digest();

const S = '000102030405060708090a0b0c0d0e0f' // seed

/** master key */
const I = sha512("Bitcoin seed", Buffer.from(S, 'hex')) // hmac-sha512(seed)
const m = I.slice(0, 32); // private key
const c = I.slice(32); // chain code

const pubKey = Buffer.from(secp256k1.publicKeyCreate(m), 'hex').toString('hex')
console.log("chain code: " + c.toString('hex'))
// 873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508
console.log("privKey: " + m.toString('hex'))
// e8f32e723decf4051aefac8e2c93c9c5b214313817cdb01a1494b917c8436b35
console.log("pubKey: " + pubKey)
// 0339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2
console.log('---')

/** child key */
const kpar = Buffer.concat([Buffer.from("00", 'hex'), m, Buffer.from("80000000", 'hex')])
console.log(Buffer.from("80000000", 'hex'))
console.log(kpar.length)
const cpar = c
const child_I = sha512(cpar, kpar)
console.log("cpar")
console.log(cpar)
const child_m = child_I.slice(0, 32); // private key
const ki = secp256k1.privateKeyTweakAdd(m, child_m);
const child_c = child_I.slice(32); // chain code
const child_pubKey = Buffer.from(secp256k1.publicKeyCreate(ki), 'hex').toString('hex')
console.log("child chain code: " + child_c.toString('hex'))
// 47fdacbd0f1097043b78c63c20c34ef4ed9a111d980047ad16282c7ae6236141
console.log("child privKey: " + child_m.toString('hex'))
console.log("child privKey: " + ki.toString('hex'))
// 47a62230342a7cd15e02c3e8cc9386befe55ac129893e457166d46f37442c606
console.log("child pubKey: " + child_pubKey)
// 033171c5f58a4504363dba2ca6cb7d6275f743bc8dada02dffef75912eaeeacf13

