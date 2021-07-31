const TOKENTYPE = [
  {
    Symbol: 'UNI',
    Name: 'Uniswap',
    ContractAddresses: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    decimals: '18'
  },
  {
    Symbol: 'BUSD',
    Name: 'Binance USD (ERC-20)',
    ContractAddresses: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    decimals: '18'
  },
  {
    Symbol: 'HEX',
    Name: 'HEX',
    ContractAddresses: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
    decimals: '8'
  },
  {
    Symbol: 'VEN',
    Name: 'VeChain (ERC-20)',
    ContractAddresses: '0xd850942ef8811f2a866692a623011bde52a462c1',
    decimals: '18'
  },
  {
    Symbol: 'WBTC',
    Name: 'Wrapped BTC (ERC-20)',
    ContractAddresses: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    decimals: '8'
  },
  {
    Symbol: 'THETA',
    Name: 'Theta Token (ERC-20)',
    ContractAddresses: '0x3883f5e181fccaf8410fa61e12b59bad963fb645',
    decimals: '18'
  },
  {
    Symbol: 'TRX',
    Name: 'TRON (ERC-20)',
    ContractAddresses: '0xe1be5d3f34e89de342ee97e6e90d405884da6c67',
    decimals: '6'
  },
  {
    Symbol: 'WFIL',
    Name: 'Wrapped Filecoin  (ERC-20)',
    ContractAddresses: '0x6e1A19F235bE7ED8E3369eF73b196C07257494DE',
    decimals: '18'
  },
  {
    Symbol: 'cDAI',
    Name: 'Compound Dai',
    ContractAddresses: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
    decimals: '8'
  },
  {
    Symbol: 'cETH',
    Name: 'Compound Ether',
    ContractAddresses: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
    decimals: '8'
  },
  {
    Symbol: 'cUSDC',
    Name: 'Compound USD Coin',
    ContractAddresses: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
    decimals: '8'
  },
  {
    Symbol: 'CEL',
    Name: 'Celsius',
    ContractAddresses: '0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d',
    decimals: '4'
  },
  {
    Symbol: 'CRO',
    Name: 'Crypto.com Coin',
    ContractAddresses: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
    decimals: '8'
  },
  {
    Symbol: 'MKR',
    Name: 'Maker',
    ContractAddresses: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    decimals: '18'
  },
  {
    Symbol: 'BTT',
    Name: 'BitTorrent (ERC-20)',
    ContractAddresses: '0xe83cccfabd4ed148903bf36d4283ee7c8b3494d1',
    decimals: '6'
  },
  {
    Symbol: 'COMP',
    Name: 'Compound',
    ContractAddresses: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    decimals: '18'
  },
  {
    Symbol: 'UST',
    Name: 'Wrapped UST Token',
    ContractAddresses: '0xa47c8bf37f92abed4a126bda807a7b7498661acd',
    decimals: '18'
  },
  {
    Symbol: 'SUSHI',
    Name: 'SushiToken',
    ContractAddresses: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    decimals: '18'
  },
  {
    Symbol: 'SNX',
    Name: 'Synthetix Network Token',
    ContractAddresses: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    decimals: '18'
  },
  {
    Symbol: 'TEL',
    Name: 'Telcoin',
    ContractAddresses: '0x467Bccd9d29f223BcE8043b84E8C8B282827790F',
    decimals: '2'
  },
  {
    Symbol: 'AMP',
    Name: 'Amp',
    ContractAddresses: '0xff20817765cb7f73d4bde2e66e067e58d11095c2',
    decimals: '18'
  },
  {
    Symbol: 'HOT',
    Name: 'HoloToken',
    ContractAddresses: '0x6c6ee5e31d828de241282b9606c8e98ea48526e2',
    decimals: '18'
  },
  {
    Symbol: 'YFI',
    Name: 'yearn.finance',
    ContractAddresses: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    decimals: '18'
  },
  {
    Symbol: 'ENJ',
    Name: 'EnjinCoin',
    ContractAddresses: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
    decimals: '18'
  },
  {
    Symbol: 'CHZ',
    Name: 'chiliZ',
    ContractAddresses: '0x3506424f91fd33084466f402d5d97f05f8e3b4af',
    decimals: '18'
  },
  {
    Symbol: 'ZIL',
    Name: 'Zilliqa',
    ContractAddresses: '0x05f4a42e251f2d52b8ed15e9fedaacfcef1fad27',
    decimals: '12'
  },
  {
    Symbol: 'PAX',
    Name: 'Paxos Standard  (ERC-20)',
    ContractAddresses: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
    decimals: '18'
  },
  {
    Symbol: 'HBTC',
    Name: 'Huobi BTC  (ERC-20)',
    ContractAddresses: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
    decimals: '18'
  },
  {
    Symbol: 'NEXO',
    Name: 'Nexo',
    ContractAddresses: '0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206',
    decimals: '18'
  },
  {
    Symbol: 'stETH',
    Name: 'stETH',
    ContractAddresses: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    decimals: '18'
  },
  {
    Symbol: 'BAT',
    Name: 'BAT',
    ContractAddresses: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    decimals: '18'
  },
  {
    Symbol: 'wMANA',
    Name: 'Wrapped Decentraland MANA',
    ContractAddresses: '0xfd09cf7cfffa9932e33668311c4777cb9db3c9be',
    decimals: '18'
  },
  {
    Symbol: 'FEI',
    Name: 'Fei USD',
    ContractAddresses: '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
    decimals: '18'
  },
  {
    Symbol: 'ST',
    Name: 'FirstBlood',
    ContractAddresses: '0xaf30d2a7e90d7dc361c8c4585e9bb7d2f6f15bc7',
    decimals: '18'
  },
  {
    Symbol: 'ONE',
    Name: 'HarmonyOne',
    ContractAddresses: '0x799a4202c12ca952cb311598a024c80ed371a41e',
    decimals: '18'
  },
  {
    Symbol: 'GRT',
    Name: 'Graph Token',
    ContractAddresses: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
    decimals: '18'
  },
  {
    Symbol: 'BNT',
    Name: 'Bancor',
    ContractAddresses: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c',
    decimals: '18'
  },
  {
    Symbol: 'HUSD',
    Name: 'HUSD',
    ContractAddresses: '0xdf574c24545e5ffecb9a659c229253d4111d87e1',
    decimals: '8'
  },
  {
    Symbol: 'OMG',
    Name: 'OMG Network',
    ContractAddresses: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
    decimals: '18'
  },
  {
    Symbol: 'xSUSHI',
    Name: 'SushiBar',
    ContractAddresses: '0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272',
    decimals: '18'
  },
  {
    Symbol: 'xSUSHI',
    Name: 'SushiBar',
    ContractAddresses: '0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272',
    decimals: '18'
  },
  {
    Symbol: 'UMA',
    Name: 'UMA Voting Token v1',
    ContractAddresses: '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828',
    decimals: '18'
  },
  {
    Symbol: 'CHSB',
    Name: 'SwissBorg',
    ContractAddresses: '0xba9d4199fab4f26efe3551d490e3821486f135ba',
    decimals: '8'
  },
  {
    Symbol: 'FTM',
    Name: 'Fantom Token',
    ContractAddresses: '0x4e15361fd6b4bb609fa63c81a2be19d873717870',
    decimals: '18'
  },
  {
    Symbol: 'IOST',
    Name: 'IOSToken',
    ContractAddresses: '0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab',
    decimals: '18'
  },
  {
    Symbol: 'XDCE',
    Name: 'XinFin XDCE',
    ContractAddresses: '0x41ab1b6fcbb2fa9dced81acbdec13ea6315f2bf2',
    decimals: '18'
  },
  {
    Symbol: 'NXM',
    Name: 'NXM',
    ContractAddresses: '0xd7c49cee7e9188cca6ad8ff264c1da2e69d4cf3b',
    decimals: '18'
  },
  {
    Symbol: 'aCRV',
    Name: 'Aave interest bearing CRV',
    ContractAddresses: '0x8dae6cb04688c62d939ed9b68d32bc62e49970b1',
    decimals: '18'
  },
  {
    Symbol: 'CRV',
    Name: 'Curve DAO Token',
    ContractAddresses: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    decimals: '18'
  },
  {
    Symbol: 'cUSDT',
    Name: 'Compound USDT',
    ContractAddresses: '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9',
    decimals: '8'
  },
  {
    Symbol: 'VGX',
    Name: 'Voyager',
    ContractAddresses: '0x5af2be193a6abca9c8817001f45744777db30756',
    decimals: '8'
  },
  {
    Symbol: 'KCS',
    Name: 'KuCoin Token',
    ContractAddresses: '0xf34960d9d60be18cc1d5afc1a6f012a723a28811',
    decimals: '6'
  },
  {
    Symbol: 'LPT',
    Name: 'Livepeer Token',
    ContractAddresses: '0x58b6a8a3302369daec383334672404ee733ab239',
    decimals: '18'
  },
  {
    Symbol: 'QNT',
    Name: 'Quant',
    ContractAddresses: '0x4a220e6096b25eadb88358cb44068a3248254675',
    decimals: '18'
  },
  {
    Symbol: 'FEG',
    Name: 'FEGtoken',
    ContractAddresses: '0x389999216860ab8e0175387a0c90e5c52522c945',
    decimals: '9'
  },
  {
    Symbol: '1INCH',
    Name: '1INCH Token  (ERC-20)',
    ContractAddresses: '0x111111111117dc0aa78b770fa6a738034120c302',
    decimals: '18'
  },
  {
    Symbol: 'BTMX',
    Name: 'BitMax token',
    ContractAddresses: '0xcca0c9c383076649604eE31b20248BC04FdF61cA',
    decimals: '18'
  },
  {
    Symbol: 'wCELO',
    Name: 'Wrapped Celo',
    ContractAddresses: '0xe452e6ea2ddeb012e20db73bf5d3863a3ac8d77a',
    decimals: '18'
  },
  {
    Symbol: 'LRC',
    Name: 'LoopringCoin V2',
    ContractAddresses: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
    decimals: '18'
  },
  {
    Symbol: 'PUNDIX',
    Name: 'Pundi X Token',
    ContractAddresses: '0x0fd10b9899882a6f2fcb5c371e17e70fdee00c38',
    decimals: '18'
  },
  {
    Symbol: 'renBTC',
    Name: 'renBTC',
    ContractAddresses: '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
    decimals: '8'
  },
  {
    Symbol: 'SNT',
    Name: 'StatusNetwork',
    ContractAddresses: '0x744d70fdbe2ba4cf95131626614a1763df805b9e',
    decimals: '18'
  },
  {
    Symbol: 'DENT',
    Name: 'DENT',
    ContractAddresses: '0x3597bfd533a99c9aa083587b074434e61eb0a258',
    decimals: '8'
  },
  {
    Symbol: 'RLC',
    Name: 'RLC',
    ContractAddresses: '0x607F4C5BB672230e8672085532f7e901544a7375',
    decimals: '9'
  },
  {
    Symbol: 'BAND',
    Name: 'BandToken',
    ContractAddresses: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
    decimals: '18'
  },
  {
    Symbol: 'cUNI',
    Name: 'Compound Uniswap',
    ContractAddresses: '0x35A18000230DA775CAc24873d00Ff85BccdeD550',
    decimals: '8'
  },
  {
    Symbol: 'BAL',
    Name: 'Balancer',
    ContractAddresses: '0xba100000625a3754423978a60c9317c58a424e3d',
    decimals: '18'
  },
  {
    Symbol: 'NMR',
    Name: 'Numeraire',
    ContractAddresses: '0x1776e1f26f98b1a5df9cd347953a26dd3cb46671',
    decimals: '18'
  },
  {
    Symbol: 'GLM',
    Name: 'Golem Network Token',
    ContractAddresses: '0x7DD9c5Cba05E151C895FDe1CF355C9A1D5DA6429',
    decimals: '18'
  },
  {
    Symbol: 'EWTB',
    Name: 'Energy Web Token Bridged',
    ContractAddresses: '0x178c820f862b14f316509ec36b13123da19a6054',
    decimals: '18'
  },
  {
    Symbol: 'CELR',
    Name: 'CelerToken',
    ContractAddresses: '0x4f9254c83eb525f9fcf346490bbb3ed28a81c667',
    decimals: '18'
  },
  {
    Symbol: 'INJ',
    Name: 'Injective Token',
    ContractAddresses: '0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30',
    decimals: '18'
  },
  {
    Symbol: 'GNO',
    Name: 'Gnosis',
    ContractAddresses: '0x6810e776880c02933d47db1b9fc05908e5386b96',
    decimals: '18'
  },
  {
    Symbol: 'PAXG',
    Name: 'Paxos Gold',
    ContractAddresses: '0x45804880De22913dAFE09f4980848ECE6EcbAf78',
    decimals: '18'
  },
  {
    Symbol: 'NKN',
    Name: 'NKN',
    ContractAddresses: '0x5cf04716ba20127f1e2297addcf4b5035000c9eb',
    decimals: '18'
  },
  {
    Symbol: 'IOTX',
    Name: 'IoTeX Network',
    ContractAddresses: '0x6fb3e0a217407efff7ca062d46c26e5d60a14d69',
    decimals: '18'
  },
  {
    Symbol: 'OCEAN',
    Name: 'Ocean Token',
    ContractAddresses: '0x967da4048cD07aB37855c090aAF366e4ce1b9F48',
    decimals: '18'
  },
  {
    Symbol: 'AGIX',
    Name: 'SingularityNET Token',
    ContractAddresses: '0x5b7533812759b45c2b44c19e320ba2cd2681b542',
    decimals: '8'
  },
  {
    Symbol: 'WAX',
    Name: 'WAX Token',
    ContractAddresses: '0x39bb259f66e1c59d5abef88375979b4d20d98022',
    decimals: '8'
  },
  {
    Symbol: 'sUSD',
    Name: 'Synth sUSD',
    ContractAddresses: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    decimals: '18'
  },
  {
    Symbol: 'PROM',
    Name: 'Token Prometeus Network',
    ContractAddresses: '0xfc82bb4ba86045af6f327323a46e80412b91b27d',
    decimals: '18'
  },
  {
    Symbol: 'RPL',
    Name: 'Rocket Pool',
    ContractAddresses: '0xb4efd85c19999d84251304bda99e90b92300bd93',
    decimals: '18'
  },
  {
    Symbol: 'ALPHA',
    Name: 'AlphaToken',
    ContractAddresses: '0xa1faa113cbe53436df28ff0aee54275c13b40975',
    decimals: '18'
  },
  {
    Symbol: 'OGN',
    Name: 'OriginToken',
    ContractAddresses: '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26',
    decimals: '18'
  },
  {
    Symbol: 'FUN',
    Name: 'FunFair',
    ContractAddresses: '0x419d0d8bdd9af5e606ae2232ed285aff190e711b',
    decimals: '8'
  },
  {
    Symbol: 'OXT',
    Name: 'Orchid',
    ContractAddresses: '0x4575f41308EC1483f3d399aa9a2826d74Da13Deb',
    decimals: '18'
  },
  {
    Symbol: 'SRM',
    Name: 'Serum (ERC-20)',
    ContractAddresses: '0x476c5E26a75bd202a9683ffD34359C0CC15be0fF',
    decimals: '6'
  },
  {
    Symbol: 'SAND',
    Name: 'SAND',
    ContractAddresses: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
    decimals: '18'
  },
  {
    Symbol: 'STMX',
    Name: 'StormX',
    ContractAddresses: '0xbe9375c6a420d2eeb258962efb95551a5b722803',
    decimals: '18'
  }
]
module.exports = TOKENTYPE;
