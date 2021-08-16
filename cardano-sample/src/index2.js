var cardanoAddresses = require('cardano-addresses')
var addr = 'stake1uxm777sh5h4e6hrwsgzxe39j9dhj25yu7gjutfxgfzvg2ecxpa7lj'

cardanoAddresses.inspectAddress(addr)
  .then(info => console.log(info))
