// test case
// phrase: "abandon abandon ability",
// firstAddress: "TA891Fu7vVz595BGQpNX2MCzr7yBcxuoC7",
// firstPubKey: "0337bbb060e6166066f7f9e59e52f67bc23a6c9d0cbc815b82b6d89112444842e7",
// firstPrivKey: "3a8fbd0379a815764979de86a3fcda759cb62d49e784e7b2a9a03206c90cfae2",

const wallet = require("../utils/wallet_utils");
const { byteArray2hexStr, hexStr2byteArray } = require("../lib/crypto_utils");
const assert = require("assert");

describe("Generate private key from mnemonic", () => {
  it("should be the same", () => {
    const mnemonicTest = "abandon abandon ability";
    const privKeyBytes = wallet.getPriKeyFromMnemonic(mnemonicTest);

    assert.strictEqual(
      byteArray2hexStr(privKeyBytes).toLowerCase(),
      "3a8fbd0379a815764979de86a3fcda759cb62d49e784e7b2a9a03206c90cfae2"
    );
  });
});

describe("Generate address from private key", () => {
  it("should be the same", () => {
    const privKey =
      "266E40A737D81A35810CD3EDD35D7B98FE429335A1F4103ED903AD14237B87DE";
    const privKeyBytes = hexStr2byteArray(privKey);
    const addressBytes = wallet.getAddressFromPriKey(privKeyBytes);

    assert.strictEqual(
      wallet.getBase58CheckAddress(addressBytes),
      "TEL7yqy8F8gxdnggtPjzMFuUwJysmAfRX9"
    );
  });
});
