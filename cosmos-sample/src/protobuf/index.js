import { Cosmos } from "../src/index.js";
import message from "../src/messages/proto";

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "stargate-final";
// This rest server URL may be disabled at any time. In order to maintain stable blockchain service, it is recommended to prepare your rest server.
// (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
const lcdUrl = "http://34.71.170.158:1317";

const cosmos = new Cosmos(lcdUrl, chainId);
cosmos.setBech32MainPrefix("cosmos");
cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(mnemonic);
const privKey = cosmos.getECPairPriv(mnemonic);
const pubKeyAny = cosmos.getPubKeyAny(privKey);

cosmos.getAccounts(address).then(data => {
  // signDoc = (1)txBody + (2)authInfo
  // ---------------------------------- (1)txBody ----------------------------------
  const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
    from_address: address,
    to_address: "cosmos1jf874x5vr6wkza6ahvamck4sy4w76aq4w9c4s5",
    amount: [{ denom: "umuon", amount: String(100000) }]		// 6 decimal places (1000000 uatom = 1 ATOM)
  });

  const msgSendAny = new message.google.protobuf.Any({
    type_url: "/cosmos.bank.v1beta1.MsgSend",
    value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
  });

  const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgSendAny], memo: "" });

  // --------------------------------- (2)authInfo ---------------------------------
  const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
    public_key: pubKeyAny,
    mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
    sequence: data.account.sequence
  });

  const feeValue = new message.cosmos.tx.v1beta1.Fee({
    amount: [{ denom: "umuon", amount: String(5000) }],
    gas_limit: 200000
  });

  const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

  // -------------------------------- sign --------------------------------
  const signedTxBytes = cosmos.sign(txBody, authInfo, data.account.account_number, privKey);
  cosmos.broadcast(signedTxBytes).then(response => console.log(response));
});
