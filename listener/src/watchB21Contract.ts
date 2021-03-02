import * as dotenv from 'dotenv';
import Web3 from 'web3';
import { TransferBB21 } from './transferBB21';

class WatchB21Contract {

  constructor() {
  }

  public static watchETHLogs = () => {
    console.log('========Watching B21 tokens in ETH===============');
    dotenv.config();
    // const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/b7bf0543ad754275b30d43c6aa19d182'));
    const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.ETH_WEB3_WSS_URL));
    const swapContractAddress = process.env.ETH_SWAP_CONTRACT_ADDRESS; //'0x4F700364bd285c3C255C8ced8Cb616497547eAd8';//'0xA5B73E84f0414190d3A2718154B118129abDf15f'; // rinkeby
    const swapABI = JSON.parse(process.env.ETH_SWAP_CONTRACT_ABI);

    const contract = new web3.eth.Contract(swapABI, swapContractAddress);
    contract.events.LockTokens((error, result) => {
      if (error) {
        return console.log('Some error occurred while watching...', Date() + '================', error);
      } else {
        console.log('================Received some transfer details =================', Date() + '================');
        const receivedTransactionData = JSON.stringify(result);
        const jsonData = JSON.parse(receivedTransactionData);
        const from = jsonData.returnValues.from;
        const amount = jsonData.returnValues.value;
        console.log('Got the watch ', receivedTransactionData, ` From ${from} Value ${amount}`);
        TransferBB21.transferToken(from, amount).then(status => console.log(status));
        console.log('================Sent BB21 Tokens=================', Date() + '================');
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
