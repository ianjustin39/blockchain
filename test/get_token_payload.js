const tokenList = require('./tokenType')


const getPayload = () => {
  const array = []
  for (i = 0; i < tokenList.length; i++) {
    token = tokenList[i]
    symbol = token.Symbol
    contractAddresses = token.ContractAddresses
    decimals = token.decimals

    const data = parseInt(decimals).toString(16).padStart(2, '0') + symbol.length.toString().padStart(2, '0') + Buffer.from(symbol).toString('hex').padEnd(14, '0') + contractAddresses.substring(2)
    array.push(data)
  }
  console.log(array)
};

getPayload()
