/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @ignore Don't show this file in documentation.
 */ /** */

import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from '@polkadot/api';

import {
	createSignedTx,
	createSigningPayload,
	decode,
	deriveAddress,
	getRegistry,
	methods,
	POLKADOT_SS58_FORMAT,
} from '../src';
import { signWith } from './util';

/**
 * Entry point of the script. This script assumes a Polkadot node is running
 * locally on `http://localhost:9933`.
 */
async function main(): Promise<void> {
  // Wait for the promise to resolve async WASM
  await cryptoWaitReady();
  // Create a new keyring, and add an "Alice" account
  const keyring = new Keyring({ type: "ecdsa", ss58Format: 0 });
  const alice = keyring.addFromUri('holiday emotion cook vehicle kite spike kingdom you appear stadium exile end', {}, 'ecdsa');
  console.log(
    "Alice's SS58-Encoded Address:",
    deriveAddress(alice.publicKey, POLKADOT_SS58_FORMAT)
  ); 
  console.log(
    "Alice's Address:", alice.address
  );
  console.log(
    "Alice's Address Raw:", Buffer.from(alice.addressRaw).toString('hex')
  );
  console.log(
    "Alice's public key:", Buffer.from(alice.publicKey).toString('hex')
  );

  // Construct a balance transfer transaction offline.
  // To construct the tx, we need some up-to-date information from the node.
  // `txwrapper` is offline-only, so does not care how you retrieve this info.
  // In this tutorial, we simply send RPC requests to the node.

  // const { block } = await rpcToNode('chain_getBlock');
  // const blockHash = await rpcToNode('chain_getBlockHash');
  // const genesisHash = await rpcToNode('chain_getBlockHash', [0]);
  // const metadataRpc = await rpcToNode('state_getMetadata');
  // const { specVersion, transactionVersion } = await rpcToNode(
  //   'state_getRuntimeVersion'
  // );

  // const fromAddress = '12XfN3R6gQrui83tNBRMyGzSErGS6EvEEFaBngeicAed6FYx'

  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  // const genesisHash = api.genesisHash.toHex()
  // const lastHeader = await api.rpc.chain.getHeader();
  // const blockNumber = lastHeader.number.toString()
  // const blockHash = lastHeader.hash.toHex()
  // const { nonce, data: balance } = await api.query.system.account(fromAddress);
  // const runtimeVersion = await api.rpc.state.getRuntimeVersion()
  // console.log("nonce======= ", nonce.toString())
  

  // const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  // const api = await ApiPromise.create({ provider: wsProvider });
  // const blockHash = '0xcc981313bdb5910a6bb0a5336096c1d9a629efee505c6bc7d6208abbfb612be0';
  // const blockNumber = 4336277;
  // const genesisHash = '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3';
  const metadataRpc = (await api.rpc.state.getMetadata()).toHex();
  const specVersion = 30
  const transactionVersion = 7

	// Create Polkadot's type registry.
	const registry = getRegistry('Polkadot', 'polkadot', specVersion);

  console.log(deriveAddress(alice.publicKey, POLKADOT_SS58_FORMAT))
  keyring.setSS58Format(0);
  console.log('Polkadot', alice.address);
  console.log('publicKey', alice.publicKey);

  // Now we can create our `balances.transfer` unsigned tx. The following
  // function takes the above data as arguments, so can be performed offline
  // if desired.
  // console.log("- block number: ", parseInt(blockNumber))
  const unsigned = methods.balances.transfer(
    {
      value: '100',
      dest: '14g8DunMqhTBSG2zNjhP5PdUMGLEPWwgZGeH1di9aDXJJfKC', // Bob
    },
    {
      // address: alice.address,
      address: '14aG393FVymr4M8za3xWgy7Fz9gPz3rXTXDaGxvBwbidCW5g',
      blockHash: "0xefd09246846cd04209fb0c9bd96bc1d0bd285b2f55395a03c5569379d7f882ac",
      blockNumber: 5426318,
      // blockNumber: parseInt(blockNumber),
      eraPeriod: 128,
      genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
      metadataRpc: metadataRpc,
      nonce: 0, // Assuming this is Alice's first tx on the chain
      specVersion,
      tip: 0,
      transactionVersion,
    },
    {
      metadataRpc: metadataRpc,
      registry,
    }
  );
  unsigned['metadataRpc'] = ''
  console.log("unsigned: ")
  console.log(unsigned)

  // Decode an unsigned transaction.
  const decodedUnsigned = decode(
    unsigned,
    {
      metadataRpc,
      registry,
    },
    true
  );
  decodedUnsigned['metadataRpc'] = ''
  // console.log(
  //   `\nDecoded Transaction\n  To: ${JSON.stringify(decodedUnsigned.method.args.dest)}\n` +
  //   `  Amount: ${decodedUnsigned.method.args.value} \n` +
  //   `  decodedUnsigned:  ${JSON.stringify(decodedUnsigned)}`
  // );

	// Construct the signing payload from an unsigned transaction.
	const signingPayload = createSigningPayload(unsigned, { registry });
	console.log(`\nPayload to Sign: ${signingPayload}`);

  // Decode the information from a signing payload.
  const payloadInfo = decode(
    signingPayload,
    {
      metadataRpc,
      registry,
    },
    true
  );
  payloadInfo['metadataRpc'] = ''

  console.log(
    `\nDecoded Transaction\n  To: ${JSON.stringify(payloadInfo.method.args.dest)}\n` +
    `  Amount: ${payloadInfo.method.args.value}\n` + 
    `  PayloadInfo:  ${JSON.stringify(payloadInfo)}`
  );

	// Sign a payload. This operation should be performed on an offline device.
	const signature = signWith(alice, signingPayload, {
		metadataRpc,
		registry,
	});
	console.log(`\nSignature: ${signature}`);

	// Serialize a signed transaction.
	const tx = createSignedTx(unsigned, signature, { metadataRpc, registry });
	console.log(`\nTransaction to Submit: ${tx}`);

  // Derive the tx hash of a signed transaction offline.
  // const expectedTxHash = getTxHash(tx);
  // console.log(`\nExpected Tx Hash: ${expectedTxHash}`);

  // // Send the tx to the node. Again, since `txwrapper` is offline-only, this
  // // operation should be handled externally. Here, we just send a JSONRPC
  // // request directly to the node.
  // const actualTxHash = await rpcToNode('author_submitExtrinsic', [tx]);
  // console.log(`Actual Tx Hash: ${actualTxHash}`);

  // Decode a signed payload.
  console.log(' ======================================================================================================================== ')
  const txInfo = decode(
    tx,
    {
      metadataRpc,
      registry,
    },
    true
  );
  txInfo['metadataRpc'] = ''
  console.log(
    `\nDecoded Transaction\n  To: ${JSON.stringify(txInfo.method.args.dest)}\n` +
    `  Amount: ${txInfo.method.args.value}\n` + 
    `  txInfo:  ${JSON.stringify(txInfo) }`
  ); 
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
