
var zencashjs = require('zencashjs')
const rawtx = '01000000037775e70877e9d9279791ba8832748d6152afc226fe80aed3b1522aec9c8cb596000000006b483045022100d89e818c4460ec59273243d89a445b772d305153af48d76a5cecf816346c105b02200e643de73efed1a614f07ee9f792e18f143d4c236309da9a879f753c25f14cd081210221cf3a50433e3c167f85f570d1d23d14b1c95b290adb0deb523d017284157031ffffffff03e19447924891d86c04aeba75a4b0d45228a04bd64ddb054ba184fc1ff1a838000000006b48304502210087b1002af9407a18613eaa8853258dd575fb646a6022661dce5e64d2bebb6d9902204aad59c3dd67779d162196fd8d7514037b3a00826222d5883973f1807d44457281210221cf3a50433e3c167f85f570d1d23d14b1c95b290adb0deb523d017284157031ffffffffb27a0ade27a6b6b73d87d42405bc32867c1ab8c0b8cd731e80b70d58b80074cc000000006a473044022065531c48059d717494d3204254bebb5d9c2c4cb9af292b08e231bcc62da7c6910220146783abb6b3853a9351ab79ab01fda6ec666088b2c14b820651f2e8443371da81210221cf3a50433e3c167f85f570d1d23d14b1c95b290adb0deb523d017284157031ffffffff0230750000000000003f76a9142921ae402538d41ff198c90bd3f5ec1585f5b08d88ac20a6d5d8aee037fb13a31d12eb169f34a0a6b5b9573d9c485c35229b08000000000353910cb410270000000000003f76a9149428f17d6253752cd7ffa36c1e33ff240576f49888ac20a6d5d8aee037fb13a31d12eb169f34a0a6b5b9573d9c485c35229b08000000000353910cb400000000'

console.log('-----------')
const data = zencashjs.transaction.deserializeTx(rawtx)
// const data = zencashjs.transaction.serializeTx(txobj)
console.log(JSON.stringify(data))
console.log(data)

var request = require('request');
const body = JSON.stringify({ rawtx })


/** ======== send Transation ======== */
const sendTx = false
if (sendTx) {
  request({
    url: 'https://explorer.zensystem.io/api/tx/send',
    method: "POST",
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: { rawtx: rawtx }
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('====success====')
    } else {
      console.log('====error====')
      console.log(response.statusCode)
      console.log(error)
    }
    console.log(body)
  });
}

