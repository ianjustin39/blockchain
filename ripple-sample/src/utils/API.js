/**
 * - ripple-lib: https://github.com/ripple/ripple-lib
 * - ripple-API doc: https://xrpl.org/rippleapi-reference.html
 * - rippled API Reference: https://xrpl.org/rippled-api.html
 * - xrpscan: https://xrpscan.com/account/rEoA7FTruU4SMdG99yuuUbUPxp1bh9aZjR
 */

const RippleAPI = require("ripple-lib").RippleAPI;

const api = new RippleAPI({
  server: "wss://s1.ripple.com", // Public rippled server
});

api.on("error", (errorCode, errorMessage) => {
  console.log(errorCode + ": " + errorMessage);
});
api.on("connected", () => {
  console.log("connected");
});
api.on("disconnected", (code) => {
  console.log("disconnected, code:", code);
});

exports.getAccountInfo = async (myAddress) => {
  console.log("========= getAccountInfo =========");

  await api
    .connect()
    .then(() => {
      return api.getAccountInfo(myAddress);
    })
    .then((info) => {
      console.log(info);
      console.log("getAccountInfo done");
    })
    .then(() => {
      return api.disconnect();
    })
    .catch(console.error);
};

exports.prepareTransaction = async (params) => {
  console.log("========= prepareTransaction =========");

  const { txType, fromAddress, msgKey } = params;

  try {
    await api.connect();
    const preparedTx = await api.prepareTransaction(
      {
        TransactionType: txType,
        Account: fromAddress,
        MessageKey: msgKey,
      },
      {
        maxLedgerVersionOffset: 75, // Expire this transaction if it doesn't execute within ~5 minutes:
      }
    );
    const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion;
    console.log("Transaction cost:", preparedTx.instructions.fee, "XRP");
    console.log("Transaction expires after ledger:", maxLedgerVersion);
    await api.disconnect();
    return preparedTx.txJSON;
  } catch (e) {
    console.error;
  }
};

exports.signTransaction = (txJSON, keypair) => {
  console.log("========= signTransaction =========");
  return api.sign(txJSON, keypair);
};

exports.sendTransaction = async (signedTx) => {
  console.log("========= sendTransaction =========");
  return api
    .connect()
    .then(() => {
      return api.submit(signedTx);
    })
    .then((result) => console.log(result))
    .then(() => {
      return api.disconnect();
    })
    .catch(console.error);
};
