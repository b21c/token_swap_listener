module.exports = {
  apps: [
    {
      name: "eth_listener",
      script: "./lib/index_eth.js",
      watch: true,
      instances: 1,
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
      env_production: {
        ETH_SUB_ADMIN_ADDRESS: "0x114251B6a14972D52e3C05f5661260afAA6d4b1b",
        ETH_SUB_ADMIN_PRIVATE_KEY: "3b7fa17c9bbd4f35c87098ce1d0be00c22c1ebecfa856660221b883c79fc3043",
        ETH_SWAP_CONTRACT_ABI: '[{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"subAdminAddress","type":"address"}],"name":"addSubAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockB21EthFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockB21TokensFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"B21","type":"address"},{"internalType":"address payable","name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"LockTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"subAdminAddress","type":"address"}],"name":"removeSubAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"valueForToken","type":"uint256"},{"internalType":"uint256","name":"valueForEth","type":"uint256"}],"name":"setbaseFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"},{"internalType":"address","name":"transferTo","type":"address"}],"name":"transferAnyERC20Token","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"constant":true,"inputs":[],"name":"b21Contract","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesInEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesInToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"subAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]',
        ETH_SWAP_CONTRACT_ADDRESS: "0x4F700364bd285c3C255C8ced8Cb616497547eAd8",
        ETH_TOKEN_CONTRACT_ADDRESS: "0x2A3Fc54F3899689813498fFdF9ddD9E1a87feA92",
        ETH_WEB3_WSS_URL: "wss://rinkeby.infura.io/ws/v3/b7bf0543ad754275b30d43c6aa19d182",
        ETH_CHAIN: "rinkeby",
        ETH_GAS_FEE: 20,
        ETH_GAS_LIMIT: 21000,
        NODE_ENV: "production",
      },
    },    {
      name: "bsc_listener",
      script: "./lib/index_bsc.js",
      watch: true,
      instances: 1,
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
      env_production: {
        BSC_SUB_ADMIN_ADDRESS: '0x114251B6a14972D52e3C05f5661260afAA6d4b1b',
        BSC_SUB_ADMIN_PRIVATE_KEY: '3b7fa17c9bbd4f35c87098ce1d0be00c22c1ebecfa856660221b883c79fc3043',
        BSC_SWAP_CONTRACT_ABI: '[{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"subAdminAddress","type":"address"}],"name":"addSubAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockB21EthFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockB21TokensFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"B21","type":"address"},{"internalType":"address payable","name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"LockTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"subAdminAddress","type":"address"}],"name":"removeSubAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"valueForToken","type":"uint256"},{"internalType":"uint256","name":"valueForEth","type":"uint256"}],"name":"setbaseFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"},{"internalType":"address","name":"transferTo","type":"address"}],"name":"transferAnyERC20Token","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"constant":true,"inputs":[],"name":"b21Contract","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesInEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesInToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"subAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]',
        BSC_SWAP_CONTRACT_ADDRESS: '0x890611db37671662ded74f1d1b779ad771cefa5c',
        BSC_TOKEN_CONTRACT_ADDRESS: '0xb66dea7ffa3576bfc30974e572ece112883f312e',
        BSC_WEB3_WSS_URL: 'wss://apis.ankr.com/wss/82bcd2283b9c461eac74dc1adf76f295/8f02f60ae01b6862fbcae69bdaa3a2e3/binance/full/test',
        BSC_CHAIN_ID: 0X61,
        BSC_NETWORK_ID: 97,
        BSC_CHAIN: 'mainnet',
        BSC_HARD_FORK: 'istanbul',
        BSC_GAS_FEE: 20,
        BSC_GAS_LIMIT: 21000
      },
    },
  ],
};