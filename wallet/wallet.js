const { STARTING_BALANCE, ec } = require('../util/wallet-config');
const cryptoHash = require('../util/crypto-hash');
const Transaction = require('../transaction/transaction');

class Wallet {

    constructor() {
        //adding starting balance
        this.balance = STARTING_BALANCE;

        //generating key pair
        this.keyPair = ec.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    //function which will perform digitally signing data.
    // A digital signature is a cryptographic value that is calculated from the data and private key
    // This signature ensures the authenticity and integrity of the data, hence prove that
    // the transaction was created by the owner
    sign({data}) {
        return this.keyPair.sign(cryptoHash(data));
    }

    createTransaction({ recipient, amount }) {
        if(amount > this.balance) {
            throw new Error('Amount exceeds balance');
        }
        return new Transaction({senderWallet: this, amount: amount, recipient:recipient});
    }
    
}

module.exports = Wallet;