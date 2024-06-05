//this gives us a unique id evertime so that we can use it for transaction
const { v4: uuidv4 } = require('uuid');
const { verifySignature } = require('../util/wallet-config');

class Transaction {

    constructor({ senderWallet, recipient, amount }) {
        this.id = uuidv4(); //adding unique id for transaction
        this.sender = senderWallet.publicKey;
        this.recipient = recipient;
        this.amount = amount;
        this.senderBalance = senderWallet.balance;
        this.timestamp = Date.now();
        const transactionData = this.createTransactionData(); 
        this.signature = senderWallet.sign({transactionData}); //encrypting transaction data here using signing
    }

    // Method to create the transaction data
    createTransactionData() {
        return {
            sender: this.sender,
            recipient: this.recipient,
            amount: this.amount,
            timestamp: this.timestamp
        };
    }

    //function to validate any transaction
    static validTransaction(transaction) {
        const { sender, amount, recipient, timestamp, signature, senderBalance } = transaction;

        // Verify that the transaction amount is valid
        if (amount <= 0 || amount > senderBalance) {
            console.error(`Invalid transaction amount from ${sender}`);
            return false;
        }

        // Verify the signature
        if (!verifySignature({ publicKey: sender, data: { sender, recipient, amount, timestamp }, signature })) {
            console.error(`Invalid signature from ${sender}`);
            return false;
        }

        return true;
    }

}

module.exports = Transaction;