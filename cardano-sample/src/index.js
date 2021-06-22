var lib = require('cardano-crypto.js')


const App = async () => {
  var mnemonic = 'logic easily waste eager injury oval sentence wine bomb embrace gossip supreme'
  var walletSecret = await lib.mnemonicToRootKeypair(mnemonic, 2)
  console.log("- walletSecret: ", walletSecret.toString('hex'))
  var msg = Buffer.from('hello there', 'hex')
  var sig = lib.sign(msg, walletSecret)
  console.log("- sig: ", sig.toString('hex'))

  lib.getAddressType

  
}

App();
