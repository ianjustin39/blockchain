import { Keyring, ApiPromise, WsProvider } from '@polkadot/api';

const ADDR = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE'

async function tx(){
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });

  // Retrieve the genesis hash
  const genesisHash = api.genesisHash.toHex()
  console.log('- genesisHash: ', genesisHash);

  // Retrieve the chain name
  const chain = await api.rpc.system.chain();

  // Retrieve the latest header
  const lastHeader = await api.rpc.chain.getHeader();

  // Retrieve the block number and hash
  const blockNumber= lastHeader.number.toString()
  const blockHash = lastHeader.hash.toHex()

  // Log the information
  console.log('- chain: ', chain);
  console.log('- block number: ', blockNumber);
  console.log('- block hash: ', blockHash);


  const { transactionVersion } = await api.rpc.state.getRuntimeVersion()
  console.log('- version: ', transactionVersion);
  

}

tx()
