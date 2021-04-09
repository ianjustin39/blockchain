
import { EXPAND_OPT, secp256k1 } from './utils/secp256k1/secp256k1';
import { secp256k1Hasher } from './utils/secp256k1/hasher';
import { assert, bnToU8a, u8aConcat } from '@polkadot/util';

import { isBuffer } from './utils/is/buffer';
import { isHex } from './utils/is/hex';
import { isString } from './utils/is/string';
import { bufferToU8a } from './utils/buffer/toU8a';
import { hexToU8a } from './utils/hex/toU8a';
import { stringToU8a } from './utils/string/toU8a';

const unsign_data = {
  address: '15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5',
  blockHash: '0x5c697847b25d385178aa150d29e5ce212339c5624183f74bdf45f4912c89749a',
  blockNumber: '0x003c10a0',
  era: '0x0502',
  genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
  method: '0x0500008eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a4813f6ffffffffff3f01',
  nonce: '0x00000000',
  signedExtensions: [
    'CheckSpecVersion',
    'CheckTxVersion',
    'CheckGenesis',
    'CheckMortality',
    'CheckNonce',
    'CheckWeight',
    'ChargeTransactionPayment',
    'PrevalidateAttests'
  ],
  specVersion: '0x0000001c',
  tip: '0x00000000000000000000000000000000',
  transactionVersion: '0x00000006',
  version: 4
}


export type HashType = 'blake2' | 'keccak';

export function secp256k1Sign(message: Uint8Array | string, { secretKey }: Partial<Keypair>, hashType: HashType = 'blake2'): Uint8Array {
  assert(secretKey?.length === 32, 'Expected valid secp256k1 secretKey, 32-bytes');

  const key = secp256k1.keyFromPrivate(secretKey);
  const ecsig = key.sign(secp256k1Hasher(hashType, message));
  console.log(ecsig.r.toString('hex'))
  console.log(ecsig.s.toString('hex'))
  return u8aConcat(
    bnToU8a(ecsig.r, EXPAND_OPT),
    bnToU8a(ecsig.s, EXPAND_OPT),
    new Uint8Array([ecsig.recoveryParam || 0])
  );
}

export interface Keypair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

const TYPE_PREFIX = {
  ecdsa: new Uint8Array([2]),
  ed25519: new Uint8Array([0]),
  ethereum: new Uint8Array([2]),
  sr25519: new Uint8Array([1])
};


const SIG_TYPE_NONE = new Uint8Array();

const TYPE_SIGNATURE = {
  ecdsa: (m: Uint8Array, p: Partial<Keypair>) => secp256k1Sign(m, p, 'blake2')
};

export interface SignOptions {
  withType?: boolean;
}

export function u8aToU8a(value?: number[] | Buffer | Uint8Array | string | null): Uint8Array {
  if (!value) {
    return new Uint8Array();
  } else if (isString(value)) {
    return convertString(value);
  }

  return convertArray(value);
}

function convertArray(value: number[] | Uint8Array): Uint8Array {
  return Array.isArray(value)
    ? Uint8Array.from(value)
    : value;
}

function convertString(value: string): Uint8Array {
  return isHex(value)
    ? hexToU8a(value)
    : stringToU8a(value);
}


// step 1
export function sign(message: string | Uint8Array, options: SignOptions = {}) {
  const publicKey = new Uint8Array([
    255, 93, 137, 14, 41, 49, 165, 210,
    60, 135, 222, 89, 52, 7, 7, 162,
    74, 223, 145, 223, 48, 158, 230, 151,
    142, 58, 154, 193, 151, 228, 243, 137
  ])
  const secretKey = new Uint8Array([
    177, 150, 89, 15, 62, 23, 109, 42, 150, 155, 116,
    30, 207, 60, 25, 10, 36, 12, 184, 85, 244, 189,
    226, 25, 35, 90, 148, 186, 17, 150, 191, 207, 255,
    93, 137, 14, 41, 49, 165, 210, 60, 135, 222, 89,
    52, 7, 7, 162, 74, 223, 145, 223, 48, 158, 230,
    151, 142, 58, 154, 193, 151, 228, 243, 137
  ]).slice(0, 32)
  console.log("publicKey: ", Buffer.from(publicKey).toString('hex'))
  return TYPE_SIGNATURE['ecdsa'](u8aToU8a(message), { publicKey, secretKey });
}
const signingPayload = '0500006fe5efad718a8eb756b669a4de50273b864282719759a9ce01576096ed6b676fed01650200001c0000000600000091b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c39b40999ffdaaf7516ecaae014f809b99016ae30ab01b8a03857dcd411702c584'
const signature = sign(JSON.stringify(signingPayload))
console.log(signingPayload)
console.log(Buffer.from(signature).toString('hex'))

