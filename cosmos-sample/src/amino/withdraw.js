const assert = require('assert');
const cosmosjs = require("@cosmostation/cosmosjs");

const secp256k1 = require('secp256k1');
const crypto = require('crypto');

const chainId = "cosmoshub-3";
const lcdUrl = "https://api.cosmos.network/";
// const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface"


const cosmos = cosmosjs.network(lcdUrl, chainId);


const App = async () => {
  cosmos.setPath("m/44'/118'/0'/0/0");


  console.log("\n============== Get address and keypair ==============\n");

  const address = cosmos.getAddress(mnemonic);
  const ecpairPriv = cosmos.getECPairPriv(mnemonic);
  console.log("-- address: " + address)
  console.log("-- ecpairPriv: " + ecpairPriv.toString('hex'))

  const account = await cosmos.getAccounts(address)
  console.log("-- account: ")
  console.log(JSON.stringify(account.result))

  console.log("\n============== Sign MsgSend ==============\n");
  let stdSignMsg = cosmos.newStdMsg({
    msgs: [
      {
        type: "cosmos-sdk/MsgWithdrawDelegationReward",
        value: {
          delegator_address: address,
          validator_address: "cosmosvaloper1qwl879nx9t6kef4supyazayf7vjhennyh568ys"
        }
      }
    ],
    chain_id: chainId,
    fee: { amount: [{ amount: String(5000), denom: "uatom" }], gas: String(200000) },
    memo: "cool test",
    account_number: String(account.result.value.account_number),
    sequence: String(account.result.value.sequence),
    // sequence: 4,
    // account_number: 5711,
  });

  console.log("\n============== signatureBase64 ==============\n");

  const hash = crypto.createHash('sha256').update(JSON.stringify(sortObject(stdSignMsg.json))).digest('hex');
  console.log("-- JSON: " + JSON.stringify(sortObject(stdSignMsg.json)))
  console.log("-- hash: " + hash)

  let signedTx = cosmos.sign(stdSignMsg, ecpairPriv);

  const hash2 = crypto.createHash('sha256').update(JSON.stringify(sortObject(stdSignMsg.json))).digest('hex');
  const buf = Buffer.from(hash2, 'hex');
  let signObj = secp256k1.sign(buf, ecpairPriv);
  var signatureBase64 = Buffer.from(signObj.signature, 'binary').toString('base64');

  console.log("-- signature: " + JSON.stringify(signObj))
  console.log("-- signatureBase64: " + signatureBase64)

  console.log("-- signedTx: " + JSON.stringify(signedTx))

  const resp = await cosmos.broadcast(signedTx)
  console.log("-- resp: ")
  console.log(resp)

}

App();

function sortObject(obj) {
  if (obj === null) return null;
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sortObject);
  const sortedKeys = Object.keys(obj).sort();
  const result = {};
  sortedKeys.forEach(key => {
    result[key] = sortObject(obj[key])
  });
  return result;
}
