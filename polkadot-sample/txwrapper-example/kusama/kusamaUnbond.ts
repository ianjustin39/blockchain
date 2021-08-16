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
  KUSAMA_SS58_FORMAT,
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
  const keyring = new Keyring({ type: "ecdsa", ss58Format: 2 });
  const alice = keyring.addFromUri('brick advance lesson funny refuse trumpet thunder food enrich couple polar become marine neither swallow', {}, 'ecdsa');
  console.log(
    "Alice's SS58-Encoded Address:",
    deriveAddress(alice.publicKey, KUSAMA_SS58_FORMAT)
  );

  const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io/');
  const api = await ApiPromise.create({ provider: wsProvider });
  const genesisHash = api.genesisHash.toHex()
  const lastHeader = await api.rpc.chain.getHeader();
  const blockNumber = parseInt(lastHeader.number.toString())
  const blockHash = lastHeader.hash.toHex()
  // const { nonce, data: balance } = await api.query.system.account(alice.address);
  // const { nonce } = await api.query.system.account(alice.address);
  const runtimeVersion = await api.rpc.state.getRuntimeVersion()
  const metadataRpc = (await api.rpc.state.getMetadata()).toHex();
  const specVersion = Number(runtimeVersion.specVersion.toBigInt())
  const transactionVersion = Number(runtimeVersion.transactionVersion.toBigInt())
  // Create Polkadot's type registry.
  const registry = getRegistry('Kusama', 'kusama', specVersion);

  // Now we can create our `balances.transfer` unsigned tx. The following
  // function takes the above data as arguments, so can be performed offline
  // if desired.
  const unsigned = methods.staking.unbond(
    {
      value: '10000',
    },
    {
      address: deriveAddress(alice.addressRaw, KUSAMA_SS58_FORMAT),
      blockHash,
      blockNumber,
      eraPeriod: 64,
      genesisHash,
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

  txInfo['metadataRpc'] = ''
  console.log(
    `\nDecoded Transaction\n  To: ${JSON.stringify(txInfo.method.args.dest)}\n` +
    `  Amount: ${txInfo.method.args.value}\n` +
    `  txInfo:  ${JSON.stringify(txInfo)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
