const CardanocliJs = require("../index.js");
// const os = require("os");
// const path = require("path");

// const dir = path.join(os.homedir(), "testnet");
// const shelleyPath = path.join(
//   os.homedir(),
//   "testnet",
//   "testnet-shelley-genesis.json"
// );


// const shelleyPath = "../mainnet-shelley-genesis.json";

// const cardanocliJs = new CardanocliJs({
//   network: "testnet-magic 1097911063",
//   dir: dir,
//   shelleyGenesisPath: shelleyPath,
//   socketPath: path.join(os.homedir(), "testnet", "db", "socket"),
// });

const shelleyGenesisPath = "../mainnet-shelley-genesis.json";
const cardanocliJs = new CardanocliJs({ shelleyGenesisPath });

//funded wallet
const sender = cardanocliJs.wallet("CoolWallet");
console.log(
  "Balance of Sender wallet: " +
    cardanocliJs.toAda(sender.balance().value.lovelace) +
    " ADA"
);
console.log("sender.paymentAddr: ", sender.paymentAddr)

const certs = cardanocliJs.stakeAddressDeregistrationCertificate('CoolWallet');

console.log("cert: ", certs)

// create raw transaction
let txInfo = {
  // txIn: cardanocliJs.queryUtxo(sender.paymentAddr),
  txIn: [{
    address: sender.paymentAddr,
    value: {
      // lovelace: sender.balance().value.lovelace - cardanocliJs.toLovelace(5),
      lovelace: 10000000,
    }
  }],
  txOut: [
    {
      address: sender.paymentAddr,
      value: {
        // lovelace: sender.balance().value.lovelace - cardanocliJs.toLovelace(5),
        lovelace: 49999999000000,
      },
    }
  ],
  metadata: { 1: { cardanocliJs: "First Metadata from cardanocli-js" } },
};

const tx = cardanocliJs.transactionBuildRaw({
  ...txInfo,
  fee: 178701,
  certs: [certs]
});

console.log("tx: ", tx)

let txSigned = cardanocliJs.transactionSign({
  txBody: tx,
  signingKeys: [sender.payment.skey, sender.stake.skey],
  certs: [certs]
});

console.log("- sign the transaction: ", txSigned)