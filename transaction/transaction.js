//this gives us a unique id evertime so that we can use it for transaction
const { v4: uuidv4 } = require('uuid');
const { verifySignature } = require('../util/wallet-config');

class Transaction {
    constructor({ senderWallet, recipient, amount }) {
        this.id = uuidv4(); //gives unqiue id to transaction
        this.sender = senderWallet.publicKey;
        this.recipient = recipient;
        this.amount = amount;
        this.timestamp = Date.now();
        this.senderBalance = senderWallet.balance;
        this.signature = this.createSignature(senderWallet);
    }

    createSignature(senderWallet) {
        const data = this.createTransactionData();
        return senderWallet.sign({ data });
    }

    createTransactionData() {
        return {
            sender: this.sender,
            recipient: this.recipient,
            amount: this.amount,
            timestamp: this.timestamp
        };
    }

    static validTransaction(transaction) {
        const { sender, amount, recipient, timestamp, signature, senderBalance } = transaction;

        // Check if the amount is not zero
        if (amount <= 0) {
            console.error('Transaction amount must be greater than zero');
            return false;
        }

        // Check if the amount is not more than the sender's balance
        if (amount > senderBalance) {
            console.error(`Transaction amount exceeds balance. Sender balance: ${senderBalance}, Amount: ${amount}`);
            return false;
        }

        //verify signature 
        if (!verifySignature({
            publicKey: sender,
            data: { sender, recipient, amount, timestamp },
            signature
        })) {
            console.error(`Invalid signature from ${sender}`);
            return false;
        }

        return true;
    }
}

module.exports = Transaction;