import Web3 from 'web3';
import { TransferBB21 } from './transferBB21';

class WatchB21Contract {

  constructor() {
  }

  public static watchETHLogs = () => {
    console.log('========Watching B21 tokens in ETH===============');
    const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/b7bf0543ad754275b30d43c6aa19d182'));
    const swapContractAddress = '0x4F700364bd285c3C255C8ced8Cb616497547eAd8';//'0xA5B73E84f0414190d3A2718154B118129abDf15f'; // rinkeby
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
        TransferBB21.transferToken(from, amount).then(status => console.log(status));
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

export { WatchB21Contract };
