const data = {
  "signature": {
    "signer": {
      "Id": "13v5sr4E8TLLfnA6ytPQwkA5HsEivYFpvaBATj5dDyDa38mY"
    },
    "signature": {
      "Sr25519": "0x1a1f4d895cd8c252eae73de94a4303803b95895230ed4be20e6efc236aeb626f3159c7d93d1eeeb0ec2077f46e87f0f35d2fba27aa21342ec3322d2adc3cef80"
    },
    "era": {
      "MortalEra": "0x0502"
    },
    "nonce": 0,
    "tip": 0
  },
  "method": {
    "callIndex": "0x0500",
    "args": {
      "dest": {
        "Id": "14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3"
      },
      "value": "0x0000000000000000013ffffffffffff6"
    }
  }
}

export function u8aToHex(value, bitLength = -1, isPrefixed = true) {
  const prefix = isPrefixed
    ? '0x'
    : '';

  if (!value?.length) {
    return prefix;
  }

  const byteLength = Math.ceil(bitLength / 8);

  return prefix + ((byteLength > 0 && value.length > byteLength)
    ? trim(value, Math.ceil(byteLength / 2))
    : extract(value)
  );
}
const ALPHABET = new Array(256).fill(0).map((_, n) => n.toString(16).padStart(2, '0'));
/** @internal */
function extract(value: Uint8Array): string {
  const result = new Array(value.length) as string[];

  for (let i = 0; i < value.length; i++) {
    result[i] = ALPHABET[value[i]];
  }

  return result.join('');
}

/** @internal */
function trim(value: Uint8Array, halfLength: number): string {
  return `${u8aToHex(value.subarray(0, halfLength), -1, false)}…${u8aToHex(value.subarray(value.length - halfLength), -1, false)}`;
}

console.log('===')
console.log(u8aToHex(Buffer.from(JSON.stringify(data))))
console.log('===')
