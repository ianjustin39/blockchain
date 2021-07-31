import { Keyring, ApiPromise, WsProvider } from '@polkadot/api';

const mnemonic = "brick advance lesson funny refuse trumpet thunder food enrich couple polar become marine neither swallow"
// const mnemonic = "maze drum fatal beyond convince brand erode aisle word since art render"
const TO = '15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y'

async function tx() {
  
  const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io/');
  const api = await ApiPromise.create({ provider: wsProvider });

  /* -- Retrieve the genesis hash -- */
  const genesisHash = api.genesisHash.toHex()
  const chain = await api.rpc.system.chain();
  const lastHeader = await api.rpc.chain.getHeader();
  const blockNumber = lastHeader.number.toString()
  const blockHash = lastHeader.hash.toHex()

  const runtimeVersion = await api.rpc.state.getRuntimeVersion()
  /* -- Add our from dev account -- */
  const keyring = new Keyring({ type: "ecdsa", ss58Format: 2 });
  const FROM = keyring.addFromUri(`//Alice`);

  /* -- Retrieve the account balance & nonce via the system module -- */
  const { nonce, data: balance } = await api.query.system.account(FROM.address);

  /* -- construct a transaction and retrieve the payment info -- */
  const transfer = api.tx.balances.transfer(TO, 55555);
  const { partialFee, weight } = await transfer.paymentInfo(FROM);

  /* -- Sign and send the transaction using our account -- */
  // const hash = await transfer.signAndSend(FROM);
  const hash = await transfer.signAsync(FROM);

  console.log('- hash: ', hash.toHex());
  
  // const hash2 = await transfer.send();

  // console.log('- hash2: ', hash2);

  api.disconnect()
}

tx()
