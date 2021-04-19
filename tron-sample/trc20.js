
const TronWeb = require("tronweb");
const tronWeb = new TronWeb({ fullHost: 'https://api.trongrid.io' })
// tronWeb.trx.getContract("TEEXEWrkMFKapSMJ6mErg39ELFKDqEs6w3").then(console.log)

const App = async () => {
  var parameter = [{ type: "address", value: "TV3nb5HYFe2xBEmyb3ETe93UGkjAhWyzrs" }, { type: "uint256", value: 100 }]
  var options = {
    feeLimit: 100000000,
    callValue: 0,
    tokenValue: 10,
    tokenId: 1000001
  }
  const transaction = await tronWeb.transactionBuilder.triggerSmartContract("TEEXEWrkMFKapSMJ6mErg39ELFKDqEs6w3", "transfer(address, uint256) ", options, parameter, "417946F66D0FC67924DA0AC9936183AB3B07C81126");
  console.log(transaction)
}

App()
