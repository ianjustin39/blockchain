const tokenList = require('./tokenType')
const signatureList = require('./signature')


const getPayload = () => {
  const array = []
  for (i = 0; i < tokenList.length; i++) {
    signature = signatureList[i]
    token = tokenList[i]
    symbol = token.Symbol
    contractAddresses = token.ContractAddresses
    decimals = token.decimals

    const payload = parseInt(decimals).toString(16).padStart(2, '0') + symbol.length.toString().padStart(2, '0') + Buffer.from(symbol).toString('hex').padEnd(14, '0') + contractAddresses.substring(2)
    const jsonData = {
      name: token.Name,
      symbol: symbol,
      unit: decimals,
      contractAddress: contractAddresses,
      signature: payload + signature
    }
    array.push(jsonData)
    
  }
  console.log(array)
};

getPayload()
