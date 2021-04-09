const {
  mnemonicGenerate,
  mnemonicToMiniSecret,
  mnemonicValidate,
  naclKeypairFromSeed
} = require('@polkadot/util-crypto');

async function main() {
  // Create mnemonic string for Alice using BIP39
  const mnemonicAlice = mnemonicGenerate();

  console.log(`Generated mnemonic: ${mnemonicAlice}`);

  // Validate the mnemic string that was generated
  const isValidMnemonic = mnemonicValidate(mnemonicAlice);

  console.log(`isValidMnemonic: ${isValidMnemonic}`);

  // Create valid Substrate-compatible seed from mnemonic
  const seedAlice = mnemonicToMiniSecret(mnemonicAlice);

  // Generate new public/secret keypair for Alice from the supplied seed
  const { publicKey, secretKey } = naclKeypairFromSeed(seedAlice);
  console.log(Buffer.from(publicKey).toString('hex'))
  console.log(Buffer.from(secretKey).toString('hex'))
}

main().catch(console.error).finally(() => process.exit());
