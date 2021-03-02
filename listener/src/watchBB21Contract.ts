import * as dotenv from 'dotenv';
import Web3 from 'web3';
import { TransferB21 } from './transferB21';

class WatchBB21Contract {

  constructor() {
  }

  public static watchBSCLogs = () => {
    dotenv.config();
    console.log('========Watching BB21 tokens in BSC===============');
    const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.BSC_WEB3_WSS_URL));
    // const web3 = new Web3('wss://testnet-dex.binance.org');
    const swapContractAddress = process.env.BSC_SWAP_CONTRACT_ADDRESS;
    const swapABI = JSON.parse(process.env.BSC_SWAP_CONTRACT_ABI);

    const contract = new web3.eth.Contract(swapABI, swapContractAddress);
    contract.events.LockTokens((error, result) => {
      if (error) {
        console.log('Some error occurred while watching...', Date() + '================', error);
        process.exit(1006);
      } else {
        console.log('================Received some transfer details =================', Date() + '================');
        const receivedTransactionData = JSON.stringify(result);
        const jsonData = JSON.parse(receivedTransactionData);
        const from = jsonData.returnValues.from;
        const amount = jsonData.returnValues.value;
        console.log('Got the watch ', receivedTransactionData, ` From ${from} Value ${amount}`);
        TransferB21.transferToken(from, amount.toString()).then(status => console.log(status));
        console.log('================Sent B21 Tokens=================', Date() + '================');
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
      process.exit(1006);
    });

  };
}

export { WatchBB21Contract };
