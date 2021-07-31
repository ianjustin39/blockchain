import BigNumber from 'bignumber.js';
const TronWeb = require("tronweb");

const tronweb = new TronWeb({ fullHost: 'https://api.trongrid.io' })

console.log('fullNode :', tronweb.fullNode);

export default tronweb;

export const getBalance = async (address) => {
	const balance = await tronweb.trx.getBalance(address);
	return tronweb.fromSun(balance);
};

export const bs58AddressToHex = (address) => {
	return tronweb.address.toHex(address);
};

export const trxToSun = (trx, padding) => {
	const trxBN = new BigNumber(trx);
	const sunBN = trxBN.shiftedBy(6);
	return sunBN.toFixed();
};

export const getTransferData = async (from, to, amount) => {
	const {txID, raw_data} = await tronweb.transactionBuilder.sendTrx(to, tronweb.toSun(amount), from);
	console.log('txID :', txID);
	console.log('raw_data :', raw_data);
	return raw_data;
};

export const getFreezeData = async (frozenAmount, frozenDuration, frozenResource, ownerAddress, receiverAddress) => {
	// const {txID, raw_data} = tronweb.transactionBuilder.freezeBalance(tronweb.toSun(100), 3, "ENERGY", "4115B95D2D2CBCE1B815BA4D2711A3BEA02CBB37F3", "4115B95D2D2CBCE1B815BA4D2711A3BEA02CBB37F3", 1).then(result => console.log(result));

	const amount = tronweb.toSun(frozenAmount);
	const duration = parseInt(frozenDuration);;
	const resource = (frozenResource === 0) ? 'BANDWIDTH' : 'ENERGY';
	const {txID, raw_data} = await tronweb.transactionBuilder.freezeBalance(amount, duration, resource, ownerAddress, receiverAddress);
	console.log('txID :', txID);
	console.log('raw_data :', raw_data);
	return raw_data;
};

export const getUnfreezeData = async (unfrozenResource, ownerAddress, receiverAddress) => {
	const resource = (unfrozenResource === 0) ? 'BANDWIDTH' : 'ENERGY';
	const {txID, raw_data} = await tronweb.transactionBuilder.unfreezeBalance(resource, ownerAddress, receiverAddress);
	console.log('txID :', txID);
	console.log('raw_data :', raw_data);
	return raw_data;
};

export const getVoteData = async (votes, voterAddress) => {
	console.log('votes :', votes);
	const {txID, raw_data} = await tronweb.transactionBuilder.vote(votes, voterAddress);
	console.log('txID :', txID);
	console.log('raw_data :', raw_data);
	return raw_data;
};

export const getWithdrawData = async (address) => {
	const {txID, raw_data} = await tronweb.transactionBuilder.withdrawBlockRewards(address);
	console.log('txID :', txID);
	console.log('raw_data :', raw_data);
	return raw_data;
};

export const sendTxHex = async (transaction) => {
	const result = await tronweb.fullNode.request( 'wallet/broadcasthex', {transaction}, 'post');
	console.log('result :', result);
};
