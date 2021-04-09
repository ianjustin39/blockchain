

import { assert, bnToU8a, u8aConcat } from '@polkadot/util';

import { isHex } from './utils/is/hex';
import * as BN from 'bn.js';

const MAX_U8 = new BN(2).pow(new BN(8 - 2)).subn(1);
const MAX_U16 = new BN(2).pow(new BN(16 - 2)).subn(1);
const MAX_U32 = new BN(2).pow(new BN(32 - 2)).subn(1);

const UNPREFIX_HEX_REGEX = /^[a-fA-F0-9]+$/;

function compactToU8a(_value: BN | BigInt | number): Uint8Array {
  const value = bnToBn(_value);

  if (value.lte(MAX_U8)) {
    return new Uint8Array([value.toNumber() << 2]);
  } else if (value.lte(MAX_U16)) {
    return bnToU8a(value.shln(2).addn(0b01), 16, true);
  } else if (value.lte(MAX_U32)) {
    return bnToU8a(value.shln(2).addn(0b10), 32, true);
  }

  const u8a = bnToU8a(value);
  let length = u8a.length;

  // adjust to the minimum number of bytes
  while (u8a[length - 1] === 0) {
    length--;
  }

  assert(length >= 4, 'Previous tests match anyting less than 2^30; qed');

  return u8aConcat(
    new Uint8Array([
      // substract 4 as minimum (also catered for in decoding)
      ((length - 4) << 2) + 0b11
    ]),
    u8a.subarray(0, length)
  );
}

function bnToBn<ExtToBn extends ToBn>(value?: ExtToBn | BN | BigInt | string | number | null): BN {
  if (!value) {
    return new BN(0);
  } else if (isHex(value)) {
    return hexToBn(value.toString());
  } else if (isBigInt(value)) {
    return new BN(value.toString());
  }

  return numberToBn(value);
}

function hexToBn (value?: string | number | null, options: ToBnOptions | boolean = { isLe: false, isNegative: false }): BN {
  if (!value) {
    return new BN(0);
  }

  const _options: ToBnOptions = {
    isLe: false,
    isNegative: false,
    // Backwards-compatibility
    ...(isBoolean(options) ? { isLe: options } : options)
  };

  const _value = hexStripPrefix(value as string);

  // FIXME: Use BN's 3rd argument `isLe` once this issue is fixed
  // https://github.com/indutny/bn.js/issues/208
  const bn = new BN((_options.isLe ? reverse(_value) : _value) || '00', 16);

  // fromTwos takes as parameter the number of bits, which is the hex length
  // multiplied by 4.
  return _options.isNegative ? bn.fromTwos(_value.length * 4) : bn;
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function hexStripPrefix(value?: string | null): string {
  if (!value) {
    return '';
  }

  if (hexHasPrefix(value)) {
    return value.substr(2);
  }

  if (UNPREFIX_HEX_REGEX.test(value)) {
    return value;
  }

  throw new Error(`Invalid hex ${value} passed to hexStripPrefix`);
}

function hexHasPrefix(value?: string | null): boolean {
  return !!(value && isHex(value, -1, true) && value.substr(0, 2) === '0x');
}

function reverse(value: string): string {
  return (value.match(/.{1,2}/g) || [])
    .reverse()
    .join('');
}

function isBigInt(value: unknown): value is BigInt {
  return typeof value === 'bigint';
}


function numberToBn<ExtToBn extends ToBn>(value: number | ExtToBn | BN): BN {
  return BN.isBN(value)
    ? value
    : isToBn(value)
      ? value.toBn()
      : new BN(value);
}

function isToBn(value?: unknown): value is ToBn {
  return !!value && isFunction((value as ToBn).toBn);
}

function isFunction(value: unknown): value is FnType {
  return typeof value === 'function';
}

interface ToBn {
  toBn: () => BN;
}


interface ToBnOptions {
  isLe?: boolean;
  isNegative?: boolean;
}

type FnType = Function;

const hexString = '840080f4e3bd716d3f2c32a77a3423a669d8d5864c3a6fb504c281a229d3e4d836cc00bfe0a1e8c9ddeec0945ad2ead2ddd62f2e3c9aa34bf1c31532e8f225e4d1416700b9b762b0485c4981d30632841e7f3325e74275d32e9fae5324774ba21bfd07770e84580500008eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a4813f6ffffffffff3f01'

const hex = Uint8Array.from(Buffer.from(hexString, 'hex'));

const backToHexString = Buffer.from(hex).toString('hex');

console.log(compactToU8a(hex.length))
