import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Web3 from 'web3';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})

@HostListener('ethereum.accountsChanged', ['$event.target'])

export class AppComponent implements OnInit, OnDestroy {
  public account: string;
  public b21Address: string = environment.b21Address;
  public b21Balance: string = '0';
  public bb21Address: string = environment.bb21Address;
  public bb21Balance: string = '0';
  public bscProviderURL: string = 'https://data-seed-prebsc-1-s1.binance.org:8545';
  public bscSwapAddress: string = environment.bscSwapAddress;
  public connectButtonText: string = 'Connect Wallet';
  public disableButton: boolean;
  public ethereum: any;
  public ethProviderURL: string = 'https://rinkeby.infura.io/v3/b7bf0543ad754275b30d43c6aa19d182';
  public ethSwapAddress: string = environment.ethSwapAddress;
  public feeInEther;
  public statusSpanText: string;
  public swapABI = JSON.parse('[{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"subAdminAddress","type":"address"}],"name":"addSubAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockB21EthFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockB21TokensFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"B21","type":"address"},{"internalType":"address payable","name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"LockTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"subAdminAddress","type":"address"}],"name":"removeSubAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"valueForToken","type":"uint256"},{"internalType":"uint256","name":"valueForEth","type":"uint256"}],"name":"setbaseFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"},{"internalType":"address","name":"transferTo","type":"address"}],"name":"transferAnyERC20Token","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"constant":true,"inputs":[],"name":"b21Contract","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesInEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feesInToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"subAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]');
  public swapContractAddress: string = environment.swapContractAddress;
  public tokenContractABI = JSON.parse('[{"inputs":[{"internalType":"address","name":"mintTo","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
  public tokenContractAddress: string = environment.tokenContractAddress;
  public transferForm: FormGroup;
  private web3;

  constructor(private formBuilder: FormBuilder) {
    this.ethereum = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;

    this.transferForm = this.formBuilder.group({
      amount: [''],
    });

    if (this.ethereum) {
      this.ethereum.on('accountsChanged', (accounts) => {
        console.log(`accounts changed`);
        this.account = accounts[0];
        this.getBalances().then();
      });

      this.ethereum.on('chainChanged', (networkId) => {
        console.log(`chains changed`);
        this.getContractAddress();
        this.connectAccounts().then(() => this.getBalances());
        this.isEthereumNetwork();
      });
    }
  }

  public ngOnDestroy(): void {
  }

  public async ngOnInit() {

  }

  public async connectAccounts() {
    const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
    this.account = accounts[0];
    this.web3 = new Web3(this.ethereum);
    console.log(accounts);
    await this.getBalances();
    this.getContractAddress();
  }

  public isMetaMaskInstalled = () => !!this.ethereum && this.ethereum.isMetaMask;
  public isEthereumNetwork = () => !!this.ethereum && (this.ethereum.networkVersion === '4' || this.ethereum.networkVersion === '1');
  public isBSCNetwork = () => !!this.ethereum && (this.ethereum.networkVersion === '56' || this.ethereum.networkVersion === '97');
  public isUnSupportedNetwork = () => !this.isBSCNetwork() && !this.isEthereumNetwork();

  public getContractAddress = () => {
    if (this.isEthereumNetwork()) {
      this.swapContractAddress = this.ethSwapAddress;
      this.tokenContractAddress = this.b21Address;
    } else if (this.isBSCNetwork()) {
      this.swapContractAddress = this.bscSwapAddress;
      this.tokenContractAddress = this.bb21Address;
    }
    console.log(`Contract addresses are set swap ${this.swapContractAddress} token ${this.tokenContractAddress} for ${this.ethereum.networkVersion}`);
  };

  public getBalances = async () => {
    try {
      const tempWeb3 = new Web3(this.ethProviderURL);
      const contract = new tempWeb3.eth.Contract(this.tokenContractABI, this.b21Address);
      const b21Balance = await contract.methods.balanceOf(this.account).call();
      this.b21Balance = tempWeb3.utils.fromWei(b21Balance, 'ether');
    } catch (ex) {
      this.b21Balance = '0';
      console.log(ex);
    }

    try {
      const tempWeb3 = new Web3(this.bscProviderURL);
      const contract = new tempWeb3.eth.Contract(this.tokenContractABI, this.bb21Address);
      const bb21Balance = await contract.methods.balanceOf(this.account).call();
      this.bb21Balance = tempWeb3.utils.fromWei(bb21Balance, 'ether');
    } catch (ex) {
      this.bb21Balance = '0';
      console.log(ex);
    }
  };

  public transferTokens = async () => {
    this.disableButton = true;
    if (this.isUnSupportedNetwork()) {
      return alert('Unsupported network');
    }
    if (!this.account) {
      await this.connectAccounts();
    }
    await this.getFeeDetails();
    if (this.isEthereumNetwork()) {
      this.lockWithTokens().then();
    } else if (this.isBSCNetwork()) {
      this.lockWithEther().then();
    }
  };

  public lockWithTokens = async () => {
    const amount = this.transferForm.value.amount;
    if (parseInt(amount) > 0) {
      this.statusSpanText = 'Checking permission...';
      const allowance = await this.getAllowance();
      const allowanceValue = Number(this.web3.utils.fromWei(allowance.toString(), 'ether'));
      if (!allowance) {
        return alert('unable to check allowance');
      }
      if (allowanceValue < amount) {
        this.statusSpanText = 'Await Approval Confirmation. Will initiate transfer once this transaction is confirmed.';
        const outcomeOfApproval = await this.approve();
        if (!outcomeOfApproval) {
          this.statusSpanText = 'Approval Failed';
          return;
        }
      }
      // disableFeeModalButtons();
      this.statusSpanText = 'Preparing for Transfer...';
      const contract = new this.web3.eth.Contract(this.swapABI, this.swapContractAddress);
      const amountToSend = this.web3.utils.toWei(amount.toString(), 'ether');
      contract.methods.lockB21TokensFees(amountToSend).send({ from: this.account }).then((tx) => {
        console.log(tx);
        this.getBalances();
        this.statusSpanText = `Sent. Check ${this.getExplorerURL()}/tx/${tx.transactionHash}`;
        this.disableButton = false;
      }).catch(ex => {
        console.log(ex);
        this.statusSpanText = 'Cancelled';
        this.disableButton = false;
      });
    } else {
      alert('Enter the amount');
      this.disableButton = false;
    }
  };

  lockWithEther = async () => {
    const amount = this.transferForm.value.amount;
    if (parseInt(amount) > 0) {
      this.statusSpanText = 'Checking permission...';
      const allowance = await this.getAllowance();
      const allowanceValue = Number(this.web3.utils.fromWei(allowance.toString(), 'ether'));
      if (!allowance) {
        return alert('unable to check allowance');
      }
      // $('#feeDetailsModalCenter').modal('hide');
      if (allowanceValue < amount) {
        this.statusSpanText = 'Await Approval Confirmation. Will initiate transfer once this transaction is confirmed.';
        const outcomeOfApproval = await this.approve();
        if (!outcomeOfApproval) {
          this.statusSpanText = 'Approval Failed';
          return;
        }
      }
      // disableFeeModalButtons();
      this.statusSpanText = 'Transfer in progress...';
      const contract = new this.web3.eth.Contract(this.swapABI, this.swapContractAddress);
      const amountToSend = this.web3.utils.toWei(amount.toString(), 'ether');
      contract.methods.lockB21EthFees(amountToSend).send({
        from: this.account,
        value: this.feeInEther,
      }).then((tx) => {
        console.log(tx);
        this.getBalances();
        this.statusSpanText = `Sent. Check ${this.getExplorerURL()}/tx/${tx.transactionHash}`;
        this.disableButton = false;
      }).catch(ex => {
        console.log(ex);
        this.statusSpanText = 'Cancelled';
        this.disableButton = false;
      });
    } else {
      alert('Enter the amount');
      this.disableButton = false;
    }
  };

  getAllowance = async () => {
    const contract = new this.web3.eth.Contract(this.tokenContractABI, this.tokenContractAddress);
    return contract.methods.allowance(this.account, this.swapContractAddress).call().then(info => {
      console.log(info);
      return info;
    });
  };

  getFeeDetails = async () => {
    const contract = new this.web3.eth.Contract(this.swapABI, this.swapContractAddress);
    await contract.methods.feesInEth().call().then(result => {
      this.feeInEther = result;
    }).catch(ex => console.log('ex while getting fees in eth', ex));
  };

  approve = async () => {
    const amountToApprove = this.web3.utils.toWei('500000000', 'ether');
    try {
      const contract = new this.web3.eth.Contract(this.tokenContractABI, this.tokenContractAddress);
      return contract.methods.approve(this.swapContractAddress, amountToApprove).send({ from: this.account }).then(result => {
        console.log(result);
        return true;
      }).catch(ex => {
        console.log('exception ', ex);
        this.statusSpanText = 'Approval Failed or Cancelled';
        return false;
      });
    } catch (ex) {
      console.log(ex);
      this.statusSpanText = 'Approval Failed';
      return false;
    }
  };

  getExplorerURL = () => {
    switch (this.ethereum.networkVersion) {
      case '1':
        return 'https://etherscan.io';
      case '4':
        return 'https://rinkeby.etherscan.io';
      case '56':
        return 'https://bscscan.com';
      case '97':
        return 'https://testnet.bscscan.com/';
    }
  };

}
