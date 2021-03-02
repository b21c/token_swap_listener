import Common from '@ethereumjs/common';
import { Transaction } from '@ethereumjs/tx';
import * as dotenv from 'dotenv';
import Web3 from 'web3';

class TransferBB21 {
  /*
 * This method is to transfer tokens from the swap contract address, to the user address - IN THE OTHER CHAIN
 * The address that will be signing the transaction has to be subAdmin in the swap contract
 * The subAdmin must have enough crypto currency of OTHER CHAIN
 * */
  public static transferToken = async (to: string, amount: string) => {
    console.log('==========Starting Token Transfer in BSC==============', Date() + '================');
    try {
      dotenv.config();
      const subAdminAddress = process.env.BSC_SUB_ADMIN_ADDRESS;
      const subAdminPrivateKey = process.env.BSC_SUB_ADMIN_PRIVATE_KEY;
      // const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://apis.ankr.com/wss/82bcd2283b9c461eac74dc1adf76f295/8f02f60ae01b6862fbcae69bdaa3a2e3/binance/full/test'));
      const web3 = new Web3(process.env.BSC_WEB3_WSS_URL);
      const swapContractAddress = process.env.BSC_SWAP_CONTRACT_ADDRESS; //'0x33b81307b70091Dd9F10DcEBe4Aad685ed177014';//'0xA02d1B9ABA70C3b36693018545120dEC21447cCA';
      const swapABI = JSON.parse(process.env.BSC_SWAP_CONTRACT_ABI);
      const count = await web3.eth.getTransactionCount(subAdminAddress);
      const contract = new web3.eth.Contract(swapABI, swapContractAddress);
      const tokenAddress = process.env.BSC_TOKEN_CONTRACT_ADDRESS;
      const rawTransaction = {
        'from': subAdminAddress,
        'nonce': web3.utils.toHex(count),
        'gasPrice': web3.utils.toHex(Number(process.env.BSC_GAS_FEE) * 1e9),
        'gasLimit': web3.utils.toHex(Number(process.env.BSC_GAS_LIMIT)),
        'to': swapContractAddress,
        'value': '0x0',
        'data': contract.methods.transferAnyERC20Token(tokenAddress, amount, to).encodeABI(),
        // 'chainId': '0x61',
      };
      console.log('Raw Tx', rawTransaction);
      const customChainParams = { name: 'Binance Smart Chain', chainId: Number(process.env.BSC_CHAIN_ID), networkId: Number(process.env.BSC_NETWORK_ID) };
      const customChainCommon = Common.forCustomChain(process.env.BSC_CHAIN, customChainParams, process.env.BSC_HARD_FORK);
      const opts = { common: customChainCommon };
      // const common = new Common({ chain: 'testnet' });
      const tx = Transaction.fromTxData(rawTransaction, opts);
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

export { TransferBB21 };
