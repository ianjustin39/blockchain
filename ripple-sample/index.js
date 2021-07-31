/**
 * Ref: https://coil.com/p/wietse/Prepare-for-claiming-your-Spark-token-Flare-Networks-a-tool-for-XUMM-XRPToolkit/NkXJQUqpi
 */

const API = require("./src/utils/API");

const App = async () => {
  const myAddress = "rEoA7FTruU4SMdG99yuuUbUPxp1bh9aZjR";
  await API.getAccountInfo(myAddress);

  // compose raw transaction
  const params = {
    txType: "AccountSet",
    fromAddress: myAddress,
    msgKey:
      "02000000000000000000000000BAF99ED5B5663329FA417953007AFCC60F06F781",
  };
  const txJSON = await API.prepareTransaction(params);
  console.log("txJSON", txJSON);

  const publicKey =
    "027f033c29de4bc02096492da93e00d55d2851f74dc0b5ab58c9b83b3e8067b4af";
  const privateKey =
    "fa56ff60a4879240c922653a0f91cbfd2cdaf448b37bf97a49e2bf2c67d24145";
  const keyPair = {
    privateKey,
    publicKey,
  };

  const signedTxObj = API.signTransaction(txJSON, keyPair);
  console.log("signedTx", signedTxObj);

  // await API.sendTransaction(signedTxObj.signedTransaction);
};

App();
