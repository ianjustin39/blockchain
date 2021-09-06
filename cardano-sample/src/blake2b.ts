import * as Block from 'multiformats/block'
import * as codec from '@ipld/dag-cbor'
import { blake2b224 as hasher } from '@multiformats/blake2/blake2b'


const App = async () => {

  const paymentHash = 'a74ecc86669b75fe9e2310c08554cec8f0e0aeccc0216766b2c832d7'
  const stakeHash = 'b7ef7a17a5eb9d5c6e82046cc4b22b6f25509cf225c5a4c848988567'

  const value = paymentHash + stakeHash
  const block = await Block.encode({ value, codec, hasher })
  console.log(block.cid)
  // -> CID(bafy2bzacedtxqx7k666ugf5mmagr2fxmbpfncbcji5jfg5uduausgb62y3av4)
}

App()



