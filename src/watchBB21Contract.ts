import Web3 from 'web3';
import { TransferB21 } from './transferB21';

class WatchBB21Contract {

  constructor() {
  }

  public static watchBSCLogs = () => {
    console.log('========Watching BB21 tokens in BSC===============');
    const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://apis.ankr.com/wss/82bcd2283b9c461eac74dc1adf76f295/8f02f60ae01b6862fbcae69bdaa3a2e3/binance/full/test'));
    // const web3 = new Web3('wss://testnet-dex.binance.org');
    const swapContractAddress = '0x890611db37671662ded74f1d1b779ad771cefa5c';
    const swapABI = JSON.parse('[{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"subAdminAddress","type":"address"}],"name":"addSubAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockB21EthFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockB21TokensFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"B21","type":"address"},{"internalType":"address payable","name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"LockTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"subAdminAddress","type":"address"}],"name":"removeSubAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"valueForToken","type":"uint256"},{"internalType":"uint256","name":"valueForEth","type":"uint256"}],"name":"setbaseFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"},{"internalType":"address","name":"transferTo","type":"address"}],"name":"transferAnyERC20Token","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"constant":true,"inputs":[],"name":"b21Contract","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesInEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesInToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"subAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]');

    const contract = new web3.eth.Contract(swapABI, swapContractAddress);
    contract.events.LockTokens((error, result) => {
      if (error) {
        return console.log('Some error occurred while watching...', error);
      } else {
        const receivedTransactionData = JSON.stringify(result);
        const jsonData = JSON.parse(receivedTransactionData);
        const from = jsonData.returnValues.from;
        const amount = jsonData.returnValues.value;
        console.log('Got the watch ', receivedTransactionData, ` From ${from} Value ${amount}`);
        TransferB21.transferToken(from, amount.toString()).then(status => console.log(status));
      }
    }).on('connected', function (subscriptionId) {
      console.log('connected with subscription id', subscriptionId);
    }).on('data', function (event) {
      console.log('received data', event); // same results as the optional callback above
    }).on('changed', function (event) {
      console.log('it has changed');
    }).on('error', function (error, receipt) {
      // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      console.log('rejected', error, receipt);
    });

  };
}

export { WatchBB21Contract };
