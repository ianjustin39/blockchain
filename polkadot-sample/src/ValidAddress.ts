
const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');

const address = '1E6yt2VuSzcN2ErpBFBQj5XHXpZ2CcBGc8gT23wKXsqbewcf';

const isValidAddressPolkadotAddress = () => {
  try {
    const data = encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );
    return true;
  } catch (error) {
    return false;
  }
};

const isValid = isValidAddressPolkadotAddress();

console.log(isValid);
