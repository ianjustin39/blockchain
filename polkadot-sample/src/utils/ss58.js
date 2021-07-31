const bs58 = require('bs58')
const { blake2b } = require('blakejs')
var blake2 = require('blake2');
var h = blake2.createHash('blake2b');

function ss58_decode(address) {
  let a
  try {
    a = bs58.decode(address)
  }
  catch (e) {
    console.log(e)
    return null
  }
  console.log("- bs58 a: " + a.toString('hex'))
  // if (a[0] == 42) {
    if (a.length == 32 + 1 + 2) {
      let address = a.slice(0, 33)
      let hash = blake2b(address)
      console.log("- blake2b: " + Buffer.from(hash, 'hex').toString('hex'))
      // if (a[33] == hash[0] && a[34] == hash[1]) {
        return address.slice(1)
      // } else {
      //   // invalid checksum
      //   console.error("invalid checksum")
      //   return null
      // }
    } else {
      // Invalid length.  
      console.error("invalid length")
      return null
    }
  // } else {
  //   // Invalid version.
  //   console.error("invalid version")
  //   return null
  // }
}

function ss58_encode(address) {
  if (address.length != 32) {
    return null
  }
  // let bytes = new Uint8Array([42, ...address])

  let bytes = new Uint8Array([00, ...address])
  // let bytes = new Uint8Array([02, ...address])
  let hash = blake2b(new Uint8Array([53533538505245, ...bytes]))
  console.log((53533538505245).toString(''))
  console.log("hash: ", Buffer.from(hash).toString('hex'))

  // let bytes = new Uint8Array([42, ...hash])

  // let hash = h.update(Buffer.from(bytes)).digest("hex");

  console.log(Buffer.from(hash, 'hex'))
  let complete = new Uint8Array([...bytes, hash[0], hash[1]])
  console.log("- bs58 a: " + Buffer.from(complete, 'hex').toString('hex'))
  return bs58.encode(complete)
}

module.exports = { ss58_decode, ss58_encode }
