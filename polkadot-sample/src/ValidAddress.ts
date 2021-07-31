
const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');

const address = 'FyMNEdUVc87aMeVLatctP1wSzk7DMU24KsV3vyLyGx6fnQq';

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
