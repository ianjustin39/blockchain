var cardanoAddresses = require('cardano-addresses')
var addr = 'addr_test1qzjlc05tyyw264wy7m4u7np5yqdwglks0xhu6765cl4qex9r9kvav4hmznru9px9n7cpa2hmmv4593eegve3t834xppqwskp4t'

cardanoAddresses.inspectAddress(addr)
  .then(info => console.log(info))
