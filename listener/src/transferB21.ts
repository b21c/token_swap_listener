import Common from '@ethereumjs/common';
import { Transaction } from '@ethereumjs/tx';
import * as dotenv from 'dotenv';
import Web3 from 'web3';

class TransferB21 {
  /*
 * This method is to transfer tokens from the swap contract address, to the user address - IN THE OTHER CHAIN
 * The address that will be signing the transaction has to be subAdmin in the swap contract
 * The subAdmin must have enough crypto currency of OTHER CHAIN
 * */
  public static transferToken = async (to: string, amount: string) => {
    console.log('=========Starting Token Transfer in Ethereum===============', Date() + '================');
    try {
      dotenv.config();
      const subAdminAddress = process.env.ETH_SUB_ADMIN_ADDRESS;
      const subAdminPrivateKey = process.env.ETH_SUB_ADMIN_PRIVATE_KEY;
      const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.ETH_WEB3_WSS_URL));
      const swapContractAddress = process.env.ETH_SWAP_CONTRACT_ADDRESS;
      const swapABI = JSON.parse(process.env.ETH_SWAP_CONTRACT_ABI);
      const count = await web3.eth.getTransactionCount(subAdminAddress);
      const contract = new web3.eth.Contract(swapABI, swapContractAddress);
      const tokenAddress = process.env.ETH_TOKEN_CONTRACT_ADDRESS;
      const rawTransaction = {
        'from': subAdminAddress,
        'nonce': web3.utils.toHex(count),
        'gasPrice': web3.utils.toHex(Number(process.env.ETH_GAS_FEE) * 1e9),
        'gasLimit': web3.utils.toHex(Number(process.env.ETH_GAS_LIMIT)),
        'to': swapContractAddress,
        'value': '0x0',
        'data': contract.methods.transferAnyERC20Token(tokenAddress, amount, to).encodeABI(),
      };
      console.log('Raw Tx', rawTransaction);
      const common = new Common({ chain: process.env.ETH_CHAIN });
      const tx = Transaction.fromTxData(rawTransaction, { common });
      const privateKey = Buffer.from(
        subAdminPrivateKey,
        'hex',
      );

      const signedTx = tx.sign(privateKey);
      console.log('signed', signedTx);
      const serializedTx = signedTx.serialize().toString('hex');
      console.log('serialized', serializedTx);
      await web3.eth.sendSignedTransaction('0x' + serializedTx).on('transactionHash', console.log).catch(error => console.log(`Caught error `, error));
      console.log('================Completed=================', Date() + '================');
      return true;
    } catch (ex) {
      console.log('Exception', ex);
      console.log('================Failed=================', Date() + '================');
      return false;
    }
  };
}

export { TransferB21 };
