const { marshalTx, unmarshalTx, encodeBech32, decodeBech32 } = require('@tendermint/amino-js');
const { base64ToBytes, bytesToBase64 } = require('@tendermint/belt');
const tx = {
	'type': 'auth/StdTx',
	'value': {
		'msg': [{
			'type': 'cosmos-sdk/MsgSend',
			'value': {
				'from_address': 'cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r',
				'to_address': 'cosmos1z7g5w84ynmjyg0kqpahdjqpj7yq34v3suckp0e',
				'amount': [{
					'denom': 'uatom',
					'amount': '11657995',
				}],
			},
		}],
		'fee': {
			'amount': [{
				'denom': 'uatom',
				'amount': '5000',
			}],
			'gas': '200000',
		},
		'signatures': [{
			'pub_key': {
				'type': 'tendermint/PubKeySecp256k1',
				'value': 'AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP',
			},
			'signature': '1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==',
		}],
		'memo': '1122672754',
	},
};
const jsonString = JSON.stringify(tx);
console.log(' jsonString :', jsonString);
const encodedTx = marshalTx(tx);
console.log('\n encodedTx :', Buffer.from(encodedTx).toString('hex'));
const decodedTx = unmarshalTx(encodedTx);
console.log('\n decodedTx :', decodedTx);
const base64 = bytesToBase64(Buffer.from(encodedTx, 'hex'));
console.log('\n base64 :', base64);
