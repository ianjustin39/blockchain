// import { Cosmos } from "../src/index.js";
// import message from "../src/messages/proto";
// const Cosmos = require("../src/index.js")
// const message = require("../src/messages/proto.d.ts")
// const Cosmos = CosmosIndex.Cosmos

const proto = require('./cosmosProtobuf')
const Cosmos = require('./cosmosIndex')


// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
// const chainId = "stargate-final";
// const lcdUrl = "http://34.71.170.158:1317";

const chainId = "cosmoshub-4";
const lcdUrl = "https://api.cosmos.network/";

const App = async () => {
	const cosmos2 = new Cosmos.Cosmos(lcdUrl, chainId);
	cosmos2.setBech32MainPrefix("cosmos");
	cosmos2.setPath("m/44'/118'/0'/0/0");
	const address = await cosmos2.getAddress(mnemonic);
	const privKey = await cosmos2.getECPairPriv(mnemonic);
	const pubKeyAny = await cosmos2.getPubKeyAny(privKey);

	cosmos2.getAccounts(address).then(data => {
		// signDoc = (1)txBody + (2)authInfo
		// ---------------------------------- (1)txBody ----------------------------------
		const msgWithdraw = new proto.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward({
			// from_address: 'cosmos1uqnpy2ay7rsjyd4s3562d9nyd8ag0kjqseg3gz',
			delegator_address: address,
			validator_address: "cosmosvaloper1qwl879nx9t6kef4supyazayf7vjhennyh568ys"
		});

		const msgWithdrawAny = new proto.google.protobuf.Any({
			type_url: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
			value: proto.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward.encode(msgWithdraw).finish()
		});

		const txBody = new proto.cosmos.tx.v1beta1.TxBody({ messages: [msgWithdrawAny], memo: "" });
		console.log("- msgWithdraw: ", msgWithdraw.toJSON())
		console.log("- msgWithdraw protobuf: ", Buffer.from(proto.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward.encode(msgWithdraw).finish(), 'hex').toString('hex'))
		console.log('---')
		// --------------------------------- (2)authInfo ---------------------------------

		const signerInfo = new proto.cosmos.tx.v1beta1.SignerInfo({
			public_key: pubKeyAny,
			mode_info: { single: { mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
			sequence: data.account.sequence
		});
		console.log("- signerInfo: ", signerInfo)
		console.log('---')

		const feeValue = new proto.cosmos.tx.v1beta1.Fee({
			amount: [{ denom: "uatom", amount: String(5000) }],
			gas_limit: 200000
		});
		console.log("- feeValue: ", feeValue.toJSON())
		console.log("- feeValue protobuf: ", Buffer.from(proto.cosmos.tx.v1beta1.Fee.encode(feeValue).finish(), 'hex').toString('hex'))
		console.log('---')

		const authInfo = new proto.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

		// -------------------------------- sign --------------------------------
		const signedTxBytes = cosmos2.sign(txBody, authInfo, data.account.account_number, privKey);
		// cosmos2.broadcast(signedTxBytes, 'BROADCAST_MODE_BLOCK').then(response => console.log(response));
	});

}

App();

// { $root as default };
