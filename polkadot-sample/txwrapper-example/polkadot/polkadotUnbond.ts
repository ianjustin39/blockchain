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
  const keyring = new Keyring();
  const alice = keyring.addFromUri('//Alice', { name: 'Alice' }, 'sr25519');
  console.log(
    "Alice's SS58-Encoded Address:",
    deriveAddress(alice.publicKey, POLKADOT_SS58_FORMAT)
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

  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  const blockHash = '0x5c697847b25d385178aa150d29e5ce212339c5624183f74bdf45f4912c89749a';
  const blockNumber = 3936416;
  const genesisHash = '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3';
  const metadataRpc = (await api.rpc.state.getMetadata()).toHex();
  const specVersion = 28
  const transactionVersion = 6

  // Create Polkadot's type registry.
  const registry = getRegistry('Polkadot', 'polkadot', specVersion);

  // Now we can create our `balances.transfer` unsigned tx. The following
  // function takes the above data as arguments, so can be performed offline
  // if desired.
  const unsigned = methods.staking.unbond(
    {
      value: '10000',
    },
    {
      address: deriveAddress(alice.publicKey, POLKADOT_SS58_FORMAT),
      blockHash,
      blockNumber,
      eraPeriod: 64,
      genesisHash,
      metadataRpc: metadataRpc,
      nonce: 55, // Assuming this is Alice's first tx on the chain
      specVersion,
      tip: 22,
      transactionVersion,
    },
    {
      metadataRpc: metadataRpc,
      registry,
    }
  );
  // unsigned['metadataRpc'] = ''
  // console.log("unsigned: ")
  // console.log(unsigned)

  // Decode an unsigned transaction.
  // const decodedUnsigned = decode(
  //   unsigned,
  //   {
  //     metadataRpc,
  //     registry,
  //   },
  //   true
  // );
  // console.log(
  //   `\nDecoded Transaction\n  To: ${JSON.stringify(decodedUnsigned.method.args.dest)}\n` +
  //   `  Amount: ${decodedUnsigned.method.args.value}`
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

  // // Derive the tx hash of a signed transaction offline.
  // const expectedTxHash = getTxHash(tx);
  // console.log(`\nExpected Tx Hash: ${expectedTxHash}`);

  // // // Send the tx to the node. Again, since `txwrapper` is offline-only, this
  // // // operation should be handled externally. Here, we just send a JSONRPC
  // // // request directly to the node.
  // // const actualTxHash = await rpcToNode('author_submitExtrinsic', [tx]);
  // // console.log(`Actual Tx Hash: ${actualTxHash}`);

  // Decode a signed payload.
  const txInfo = decode(
    tx,
    {
      metadataRpc,
      registry,
    },
    true
  );
  console.log(
    `\nDecoded Transaction\n  To: ${JSON.stringify(txInfo.method.args.dest)}\n` +
    `  Amount: ${txInfo.method.args.value}\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
