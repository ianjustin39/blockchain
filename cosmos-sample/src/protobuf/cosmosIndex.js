// import { Cosmos } from "../src/index.js";
// import message from "../src/messages/proto";
// const Cosmos = require("../src/index.js")
// const message = require("../src/messages/proto.d.ts")
// const Cosmos = CosmosIndex.Cosmos

const fetch = require('node-fetch')
const request = require('request')
const bip32 = require('bip32')
const bip39 = require('bip39')
const bech32 = require('bech32')
const secp256k1 = require('secp256k1')
const crypto = require('crypto')
const proto = require('./cosmosProtobuf')

class Cosmos {
	constructor(url, chainId) {
		this.url = url;
		this.chainId = chainId;
		this.path = "m/44'/118'/0'/0/0";
		this.bech32MainPrefix = "cosmos";
	}

	setBech32MainPrefix(value) {
		this.bech32MainPrefix = value;
		if (!this.bech32MainPrefix) throw new Error("bech32MainPrefix object was not set or invalid");
	}

	setPath(value) {
		this.path = value;
		if (!this.path) throw new Error("path object was not set or invalid");
	}

	async getAddress(mnemonic, checkSum = true) {
		if (typeof mnemonic !== "string") {
			throw new Error("mnemonic expects a string")
		}
		if (checkSum) {
			if (!bip39.validateMnemonic(mnemonic)) throw new Error("mnemonic phrases have invalid checksums");
		}
		const seed = await bip39.mnemonicToSeed(mnemonic);
		const node = await bip32.fromSeed(seed)
		const child = node.derivePath(this.path)
		const words = bech32.toWords(child.identifier);
		return bech32.encode(this.bech32MainPrefix, words);
	}

	async getECPairPriv(mnemonic) {
		if (typeof mnemonic !== "string") {
			throw new Error("mnemonic expects a string")
		}
		const seed = await bip39.mnemonicToSeed(mnemonic);
		const node = await bip32.fromSeed(seed);
		const child = node.derivePath(this.path);
		return child.privateKey;
	}

	async getPubKey(privKey) {
		const pubKeyByte = await secp256k1.publicKeyCreate(privKey);
		return pubKeyByte;
	}

	async	getPubKeyAny(privKey) {
		const pubKeyByte = secp256k1.publicKeyCreate(privKey);
		var buf1 = new Buffer.from([10]);
		var buf2 = new Buffer.from([pubKeyByte.length]);
		var buf3 = new Buffer.from(pubKeyByte);
		const pubKey = Buffer.concat([buf1, buf2, buf3]);
		console.log('----')
		// console.log('----', new google())
		console.log('----')
		const pubKeyAny = new proto.google.protobuf.Any({
			type_url: "/cosmos.crypto.secp256k1.PubKey",
			value: pubKey
		});
		return pubKeyAny;
	}

	getAccounts(address) {
		let accountsApi = "/cosmos/auth/v1beta1/accounts/";
		return fetch(this.url + accountsApi + address).then(response => response.json())
	}

	sign(txBody, authInfo, accountNumber, privKey) {

		console.log("accountNumber: ", )

		const bodyBytes = proto.cosmos.tx.v1beta1.TxBody.encode(txBody).finish();
		console.log("- txBody: ", txBody.toJSON())
		console.log("- txBody protobuf: ", Buffer.from(bodyBytes, 'hex').toString('hex'))
		console.log('---')
		const authInfoBytes = proto.cosmos.tx.v1beta1.AuthInfo.encode(authInfo).finish();
		console.log("- authInfo: ", authInfo)
		console.log("- authInfo protobuf: ", Buffer.from(authInfoBytes, 'hex').toString('hex'))
		console.log('---')
		const signDoc = new proto.cosmos.tx.v1beta1.SignDoc({
			body_bytes: bodyBytes,
			auth_info_bytes: authInfoBytes,
			chain_id: this.chainId,
			account_number: Number(accountNumber)
		});

		let signMessage = proto.cosmos.tx.v1beta1.SignDoc.encode(signDoc).finish();
		console.log("- signDoc: ", signDoc.toJSON())
		console.log("- signDoc protobuf: ", Buffer.from(signMessage, 'hex').toString('hex'))
		console.log('---')
		const hash = crypto.createHash("sha256").update(signMessage).digest();
		const sig = secp256k1.sign(hash, Buffer.from(privKey));
		console.log()
		const txRaw = new proto.cosmos.tx.v1beta1.TxRaw({
			body_bytes: bodyBytes,
			auth_info_bytes: authInfoBytes,
			signatures: [sig.signature],
		});
		const txBytes = proto.cosmos.tx.v1beta1.TxRaw.encode(txRaw).finish();
		console.log("- txRaw: ", txRaw.toJSON())
		console.log("- txBytes: ", Buffer.from(txBytes, 'hex').toString('hex'))
		console.log('---')
		const txBytesBase64 = Buffer.from(txBytes, 'binary').toString('base64');
		console.log("- txBytesBase64: ", txBytesBase64)
		console.log('---')
		return txBytes;
	}

	// "BROADCAST_MODE_UNSPECIFIED", "BROADCAST_MODE_BLOCK", "BROADCAST_MODE_SYNC", "BROADCAST_MODE_ASYNC"
	broadcast(signedTxBytes, broadCastMode = "BROADCAST_MODE_SYNC") {
		const txBytesBase64 = Buffer.from(signedTxBytes, 'binary').toString('base64');
		console.log("txBytesBase64: ", txBytesBase64)
		console.log('---')
		console.log('- url: ', this.url)
		console.log('- broadCastMode: ', broadCastMode)

		var options = {
			method: 'POST',
			url: this.url + '/cosmos/tx/v1beta1/txs',
			headers:
				{ 'Content-Type': 'application/json' },
			body: { tx_bytes: txBytesBase64, mode: broadCastMode },
			json: true
		};

	

		return new Promise(function (resolve, reject) {
			request(options, function (error, response, body) {
				if (error) return reject(error);
				console.log("status: ", response.statusCode)
				try {
					resolve(body);
				} catch (e) {
					reject(e);
				}
			});
		});
	}
}

module.exports = {
  Cosmos
};
