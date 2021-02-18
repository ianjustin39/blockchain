/**
 * @param {{ k: Buffer, c: Buffer }} key
 * @param {string} path
 * @return {{ k: Buffer, c: Buffer }}
 */
function ckdPriv({ k, c }, path) {
  // if i >= 2^31
  // 	 hardened child : I = HMAC-SHA512( key = c, data = 0x00 || k || i )
  // else
  // 	 normal child : I = HMAC-SHA512( key = c, data = point(k) || i )
  let data;
  if (path.slice(-1) == '\'') {
    const i = intTo32Buf(0x80000000 | parseInt(path.slice(0, -1), 10));
    data = Buffer.concat([emptyBuf, k, i]);
  } else {
    const i = intTo32Buf(parseInt(path, 10));
    const K = secp256k1.publicKeyCreate(k); // compressed
    data = Buffer.concat([K, i]);
  }
  const hmac = crypto.createHmac('sha512', c);
  hmac.update(data);
  const I = hmac.digest();
  // ki is parse256(IL) + kpar (mod n)
  const Il = I.slice(0, 32);
  const ki = secp256k1.privateKeyTweakAdd(k, Il);
  return { k: ki, c: I.slice(32) };
};
/**
 * @param {{ K: Buffer, c: Buffer }} key // compressed public key
 * @param {string} path
 * @return {{ K: Buffer, c: Buffer }}
 */
function ckdPub({ K, c }, path) {
  // if i >= 2^31
  //   hardened child : return failure
  // else
  //   normal child : I = HMAC-SHA512( key = c, data = K || i )
  if (path.slice(-1) == '\'') throw 'can not derive hardened child by public key';
  const i = intTo32Buf(parseInt(path, 10));
  const data = Buffer.concat([K, i]);
  const hmac = crypto.createHmac('sha512', c);
  hmac.update(data);
  const I = hmac.digest();
  // Ki is point(parse256(IL)) + Kpar
  const Il = I.slice(0, 32);
  const Ki = secp256k1.publicKeyCombine([secp256k1.publicKeyCreate(Il), K]);
  return { K: Buffer.from(Ki), c: I.slice(32) };
};

function intTo32Buf(i) {
  const indexBuf = Buffer.allocUnsafe(4);
  indexBuf.writeInt32BE(i);
  return indexBuf;
}

console.log(intTo32Buf(0x80000000 | parseInt(3, 10)))
