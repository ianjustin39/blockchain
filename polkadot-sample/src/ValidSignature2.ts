const { decodeAddress, signatureVerify } = require('@polkadot/util-crypto');
const { u8aToHex } = require('@polkadot/util');

const isValidSignature = (signedMessage, signature, address) => {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};

const msg = '0x9004000001e552298e47454041ea31273b4b630c64c104e4514aa3643490b8aaca9cf8ed04c60200005023000005000000b0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe688197b442498434b9d331fa6e8b3b719ca7ea78d86cd4845a53f1ca891088df'
const signature = '0x02028bf21d7956f7b8776f4bae90fd102f2c54a07476c74d54062dd5c4bb07cce958f64003fb7c915416997ab9cf91858e7829510e1fcc864b981c5086e90f933800'
const publicKey = 'CcogsRk8xzpfweM7Ak3Ds9nw2DemLhCC6gbisMpBhptpgcr'

const isValid = isValidSignature(
  msg,
  signature,
  publicKey
);

console.log(isValid)
