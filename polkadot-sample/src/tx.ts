import { Keyring, ApiPromise, WsProvider } from '@polkadot/api';

const mnemonic = "brick advance lesson funny refuse trumpet thunder food enrich couple polar become marine neither swallow"
// const mnemonic = "maze drum fatal beyond convince brand erode aisle word since art render"
const TO = '15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y'

async function tx() {
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });

  /* -- Retrieve the genesis hash -- */
  const genesisHash = api.genesisHash.toHex()
  console.log('- genesisHash: ', genesisHash);

  /* -- Retrieve chain name, latest header, block number and hash -- */
  const chain = await api.rpc.system.chain();
  const lastHeader = await api.rpc.chain.getHeader();
  const blockNumber = lastHeader.number.toString()
  const blockHash = lastHeader.hash.toHex()

  console.log('- chain: ', chain.toString());
  console.log('- block number: ', blockNumber);
  console.log('- block hash: ', blockHash);

  /* -- Retrieve the runtime version -- */
  const runtimeVersion = await api.rpc.state.getRuntimeVersion()

  console.log('- specVersion: ', runtimeVersion.specVersion.toString());
  console.log('- transactionVersion: ', runtimeVersion.transactionVersion.toString());

  // const metadata = await api.rpc.state.getMetadata()
  // console.log('- metadata ', metadata.toHex());
  // console.log('- magicNumber ', metadata.magicNumber.toString());

  /* -- Add our from dev account -- */
  const keyring = new Keyring({ type: "ecdsa", ss58Format: 0 });
  // const FROM = keyring.addFromUri(`${mnemonic}//0`, { name: 'test55555' });
  const FROM = keyring.addFromUri(`//Alice`);
  console.log('- meta: ', FROM.meta);
  console.log('- name: ', FROM.meta.name);
  console.log('- from address: ', FROM.address);
  console.log('- publicKey: ', Buffer.from(FROM.publicKey).toString('hex'));
  console.log('- publicKey: ', FROM.publicKey)

  /* -- Retrieve the account balance & nonce via the system module -- */
  const { nonce, data: balance } = await api.query.system.account(FROM.address);
  console.log('- balance: ', balance.free.toString());
  console.log('- nonce: ', nonce.toString());

  /* -- construct a transaction and retrieve the payment info -- */
  const transfer = api.tx.balances.transfer(TO, 55555);
  const { partialFee, weight } = await transfer.paymentInfo(FROM);
  console.log('- weight: ', weight.toString());
  console.log('- partialFee: ', partialFee.toString());

  /* -- Sign and send the transaction using our account -- */
  // const hash = await transfer.signAndSend(FROM);
  const hash = await transfer.signAsync(FROM);

  console.log('- hash: ', hash);
  
  const hash2 = await transfer.send();

  console.log('- hash2: ', hash2);

  api.disconnect()
}

tx()
