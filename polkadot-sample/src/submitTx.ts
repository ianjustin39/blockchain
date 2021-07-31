const fetch1 = require("node-fetch");

const url = 'wss://rpc.polkadot.io'
const tx_headers = { 'Content-type': 'application/json', 'Accept': 'text/plain' }

const tx = '0x39028400439ebc7a00972a7f31d2406867ae9320747c5fe5170ccafed6ea9844b10388c602d898eb1d7109b4ef978b9d0161e469ad19290152aee60317119fef7b64a682b95a8eab1adc426db42ef0ff37b083c2de500846d686c679265ccfed4ebfb030da010500840500006fe5efad718a8eb756b669a4de50273b864282719759a9ce01576096ed6b676f02093d00'
const sendTx = async (tx) => {
    const response = await fetch1(url, {
        headers: tx_headers,
        method: 'POST',
        body: `'{"tx": "${tx}"}'`,
    });

    console.log(response.text())
}


sendTx(tx)
