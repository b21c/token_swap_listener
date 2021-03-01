import Common from '@ethereumjs/common';
import { Transaction } from '@ethereumjs/tx';
import Web3 from 'web3';

class TransferB21 {
  /*
 * This method is to transfer tokens from the swap contract address, to the user address - IN THE OTHER CHAIN
 * The address that will be signing the transaction has to be subAdmin in the swap contract
 * The subAdmin must have enough crypto currency of OTHER CHAIN
 * */
  public static transferToken = async (to: string, amount: string) => {
    console.log('=========Token Transfer in Ethereum===============');
    try {
      const subAdminAddress = '0x114251B6a14972D52e3C05f5661260afAA6d4b1b';
      const subAdminPrivateKey = '3b7fa17c9bbd4f35c87098ce1d0be00c22c1ebecfa856660221b883c79fc3043';
      const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/b7bf0543ad754275b30d43c6aa19d182'));
      const swapContractAddress = '0x4F700364bd285c3C255C8ced8Cb616497547eAd8';
      const swapABI = JSON.parse('[{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"subAdminAddress","type":"address"}],"name":"addSubAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockB21EthFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockB21TokensFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"B21","type":"address"},{"internalType":"address payable","name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"LockTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"subAdminAddress","type":"address"}],"name":"removeSubAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"valueForToken","type":"uint256"},{"internalType":"uint256","name":"valueForEth","type":"uint256"}],"name":"setbaseFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"},{"internalType":"address","name":"transferTo","type":"address"}],"name":"transferAnyERC20Token","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"constant":true,"inputs":[],"name":"b21Contract","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesInEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesInToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"subAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]');
      const count = await web3.eth.getTransactionCount(subAdminAddress);
      const contract = new web3.eth.Contract(swapABI, swapContractAddress);
      const tokenAddress = '0x2A3Fc54F3899689813498fFdF9ddD9E1a87feA92';
      const rawTransaction = {
        'from': subAdminAddress,
        'nonce': web3.utils.toHex(count),
        'gasPrice': web3.utils.toHex(20 * 1e9),
        'gasLimit': web3.utils.toHex(210000),
        'to': swapContractAddress,
        'value': '0x0',
        'data': contract.methods.transferAnyERC20Token(tokenAddress, amount, to).encodeABI(),
      };
      console.log('Raw Tx', rawTransaction);
      const common = new Common({ chain: 'rinkeby' });
      const tx = Transaction.fromTxData(rawTransaction, { common });
      const privateKey = Buffer.from(
        subAdminPrivateKey,
        'hex',
      );

      const signedTx = tx.sign(privateKey);
      console.log('signed', signedTx);
      const serializedTx = signedTx.serialize().toString('hex');
      console.log('serialized', serializedTx);
      web3.eth.sendSignedTransaction('0x' + serializedTx).on('transactionHash', console.log).catch(error => console.log(`Caught error `, error));
      return true;
    } catch (ex) {
      console.log('Exception', ex);
    }
    return false;
  };
}

export { TransferB21 };
