async function issueTRC10(tronWeb, privateKey, createAssetAddress) {
  const trc_options = {
    name: "simon",
    abbreviation: "si",
    description: "simon test",
    url: "www.sss.com",
    totalSupply: 10000000,
    trxRatio: 1,
    tokenRatio: 1,
    saleStart: 1602054000000,
    saleEnd: 1602313200000,
    freeBandwidth: 0,
    freeBandwidthLimit: 0,
    frozenAmount: 0,
    frozenDuration: 0,
    precision: 6,
  };

  //Create an unsigned transaction that issue trc10 token，equivalent to createToken
  const tradeobj = await tronWeb.transactionBuilder
    .createAsset(trc_options, createAssetAddress)
    .then((output) => {
      console.log("- Output:", output, "\n");
      return output;
    });

  //sign
  const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);

  //broadcast
  const receipt = await tronWeb.trx
    .sendRawTransaction(signedtxn)
    .then((output) => {
      console.log("- Output:", output, "\n");
      return output;
    });
}

module.exports = {
  issueTRC10,
};
