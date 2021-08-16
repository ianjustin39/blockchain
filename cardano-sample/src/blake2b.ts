import * as Block from 'multiformats/block'
import * as codec from '@ipld/dag-cbor'
import { blake2b224 as hasher } from '@multiformats/blake2/blake2b'


const App = async () => {

  const paymentHash = ''
  const stakeHash = ''

  const value = 'b3d5f4158f0c391ee2a28a2e285f218f3e895ff6ff59cb9369c64b03b5bab5eb'
  const block = await Block.encode({ value, codec, hasher })
  console.log(block.cid)
  // -> CID(bafy2bzacedtxqx7k666ugf5mmagr2fxmbpfncbcji5jfg5uduausgb62y3av4)
}

App()
