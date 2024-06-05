const Blockchain = require('./blockchain');
const Wallet = require('../wallet/wallet');
const { verifySignature } = require('../util/wallet-config');
console.log('My Blockchain has started');
const Transaction = require('../transaction/transaction');


//1) Creating and Adding blockchain
const myBlockchain = new Blockchain();
// myBlockchain.addBlock({data: 'First Transaction'});
// myBlockchain.addBlock({data: 'Second Transaction'});
// myBlockchain.addBlock({data: 'Third Transaction'});
// myBlockchain.addBlock({data: 'Fourth Transaction'});

myBlockchain.getChain().forEach((block, index) => {
        console.log(`Block ${index}:`);
        console.log(JSON.stringify(block, null, 4));
});


//2) Validating blockchain
console.log('lets validate the blockchain');
console.log(Blockchain.isValidChain(myBlockchain.getChain()));


//3) Checking long chain rule and replacement
//     const myBlockchain2 = new Blockchain();
//     myBlockchain2.addBlock({data: 'First Transaction'});
// myBlockchain2.addBlock({data: 'Second Transaction'});
// myBlockchain2.addBlock({data: 'Third Transaction'});
// myBlockchain2.addBlock({data: 'Fourth Transaction'});
// console.log(Blockchain.isValidChain(myBlockchain2.getChain()));

// console.log('Will chain replace? ');
// myBlockchain.replaceChain(myBlockchain2.getChain());

//4) Wallet testing
console.log('Creating Wallet');
const wallet = new Wallet();
// const wallet2 = new Wallet();

//signing data
// const data = { amount: 50, recipient: 'lovish'};
// const data2 = { amount: 50, recipient: 'lovish2'};
// const signature = wallet.sign({data});
// console.log(`Signature created: ${signature}`);
// console.log(verifySignature({publicKey: wallet2.publicKey, data: data, signature: signature}));


//5) Transaction
const transaction = new Transaction({senderWallet: wallet, amount: 100, recipient: 282619});

console.log(`Is the transaction validated? ${Transaction.validTransaction(transaction)}`);





