// import { Cosmos } from "../src/index.js";
// import message from "../src/messages/proto";
// const Cosmos = require("../src/index.js")
// const message = require("../src/messages/proto.d.ts")
// const Cosmos = CosmosIndex.Cosmos

const proto = require('./cosmosProtobuf')
const Cosmos = require('./cosmosIndex')


// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
// const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const mnemonic = "holiday emotion cook vehicle kite spike kingdom you appear stadium exile end";

// const chainId = "stargate-final";
// const lcdUrl = "http://34.71.170.158:1317";

const chainId = "cosmoshub-4";
const lcdUrl = "https://api.cosmos.network/";

const App = async () => {
	const cosmos2 = new Cosmos.Cosmos(lcdUrl, chainId);
	cosmos2.setBech32MainPrefix("cosmos");
	cosmos2.setPath("m/44'/118'/0'/0/1");
	const address = await cosmos2.getAddress(mnemonic);
	const privKey = await cosmos2.getECPairPriv(mnemonic);
	const pubKeyAny = await cosmos2.getPubKeyAny(privKey);

	cosmos2.getAccounts(address).then(data => {
		// signDoc = (1)txBody + (2)authInfo
		// ---------------------------------- (1)txBody ----------------------------------
		const msgSend = new proto.cosmos.bank.v1beta1.MsgSend({
			// from_address: 'cosmos1uqnpy2ay7rsjyd4s3562d9nyd8ag0kjqseg3gz',
			from_address: address,
			to_address: "cosmos1uqnpy2ay7rsjyd4s3562d9nyd8ag0kjqseg3gz",
			amount: [{ denom: "uatom", amount: String(1000) }, { denom: "uatom", amount: String(20000) }]		// 6 decimal places (1000000 uatom = 1 ATOM)
		});

		const msgSendAny = new proto.google.protobuf.Any({
			type_url: "/cosmos.bank.v1beta1.MsgSend",
			value: proto.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
		});

		const txBody = new proto.cosmos.tx.v1beta1.TxBody({ messages: [msgSendAny], memo: "" });
		console.log("- msgSend: ", msgSend.toJSON())
		console.log("- msgSend protobuf: ", Buffer.from(proto.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish(), 'hex').toString('hex'))
		console.log('---')
		// --------------------------------- (2)authInfo ---------------------------------

		const signerInfo = new proto.cosmos.tx.v1beta1.SignerInfo({
			public_key: pubKeyAny,
			mode_info: { single: { mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
			// sequence: data.account.sequence
			sequence: '10'
		});
		console.log("- signerInfo: ", signerInfo)
		console.log("- signerInfo protobuf: ", Buffer.from(proto.cosmos.tx.v1beta1.SignerInfo.encode(signerInfo).finish(), 'hex').toString('hex'))
		console.log('---')

		const feeValue = new proto.cosmos.tx.v1beta1.Fee({
			amount: [{ denom: "uatom", amount: String(5000) }],
			gas_limit: 200000
		});
		console.log("- feeValue: ", feeValue.toJSON())
		console.log("- feeValue protobuf: ", Buffer.from(proto.cosmos.tx.v1beta1.Fee.encode(feeValue).finish(),'hex').toString('hex'))
		console.log('---')

		const authInfo = new proto.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

		// -------------------------------- sign --------------------------------
		const signedTxBytes = cosmos2.sign(txBody, authInfo, data.account.account_number, privKey);
		// cosmos2.broadcast(signedTxBytes, 'BROADCAST_MODE_BLOCK').then(response => console.log(response));
	});

}

App();

// { $root as default };
